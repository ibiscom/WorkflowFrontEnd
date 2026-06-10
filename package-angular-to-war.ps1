<#
.SYNOPSIS
  Build an Angular app, copy the built files into a WAR structure and produce a .war file (no Java code required).

.DESCRIPTION
  This script automates:
   - optional npm install (invoked robustly on Windows)
   - Angular build (invokes npx robustly on Windows)
   - copies build output into a war/ staging folder with WEB-INF/web.xml
   - packages the war/ folder into a .war file using 'jar' (if available) or Compress-Archive as a fallback

  Place this script in the root of your Angular project and run it from there, or point -ProjectPath to your project root.
#>

param(
    [string]$ProjectPath = "",              # will default to script folder if empty
    [string]$AppName = $null,                 # if null, auto-detect from angular.json
    [string]$ContextPath = "/",
    [string]$Configuration = "production",
    [switch]$RunNpmInstall = $true,
    [switch]$NoNpmInstall = $false,
    [switch]$SkipBuild = $false,              # skip ng build and package existing dist
    [switch]$Force = $true,
    [switch]$UseJar = $false,
    [switch]$Zip = $true,                    # force Compress-Archive (sets UseJar to false)
    [switch]$IgnoreBudgetErrors = $true,      # continue if build exits due to size budgets but output exists
    [string]$OutputWar = $null                # if null, defaults to <ProjectName>.war
)

function Normalize-ContextPath {
    param([string]$p)
    if ([string]::IsNullOrWhiteSpace($p)) { return "/" }
    $p = $p.Trim()
    if ($p -eq "/") { return "/" }
    if (-not $p.StartsWith("/")) { $p = "/" + $p }
    if (-not $p.EndsWith("/")) { $p = $p + "/" }
    return $p
}

# Resolve a usable program path for Windows: prefer .cmd/.exe, then sibling .cmd next to a found .ps1, then local node_modules\.bin,
# and finally fall back to node + npm-cli.js (for npm) or the found entry.
function Resolve-WindowsCommand {
    param(
        [string]$name,
        [string]$projectRoot
    )

    # Collect all matches from Get-Command
    $cmds = Get-Command -Name $name -ErrorAction SilentlyContinue -All
    if ($cmds) {
        # prefer .cmd or .exe
        foreach ($c in $cmds) {
            if ($c.Path -and ($c.Path -match '\.cmd$' -or $c.Path -match '\.exe$')) {
                return $c.Path
            }
        }
        # If only .ps1 or other wrappers found, try to use sibling .cmd in same folder (common for NodeJS install)
        foreach ($c in $cmds) {
            if ($c.Path) {
                $dir = Split-Path -Path $c.Path -Parent
                $siblingCmd = Join-Path -Path $dir -ChildPath ("{0}.cmd" -f $name)
                if (Test-Path $siblingCmd) { return $siblingCmd }
            }
        }
        # otherwise return first found entry (could be .ps1)
        return $cmds[0].Path
    }

    # Try local node_modules\.bin\<name>.cmd
    $localCmd = Join-Path -Path $projectRoot -ChildPath ("node_modules\.bin\{0}.cmd" -f $name)
    if (Test-Path $localCmd) { return $localCmd }

    # Try local node_modules\.bin\<name>
    $localAny = Join-Path -Path $projectRoot -ChildPath ("node_modules\.bin\{0}" -f $name)
    if (Test-Path $localAny) { return $localAny }

    # Special fallback for npm: if Node is installed, run node with npm-cli.js if present
    if ($name -ieq "npm") {
        $nodeCmd = Resolve-WindowsCommand -name "node" -projectRoot $projectRoot
        if ($nodeCmd) {
            # common location of npm-cli.js relative to Node global install
            $possible = @(
                Join-Path (Split-Path $nodeCmd -Parent) "node_modules\npm\bin\npm-cli.js",
                Join-Path (Split-Path $nodeCmd -Parent) "..\node_modules\npm\bin\npm-cli.js"
            )
            foreach ($p in $possible) {
                $candidate = Resolve-Path -Path $p -ErrorAction SilentlyContinue
                if ($candidate) { return "$nodeCmd|$($candidate.Path)" } # special marker: "nodePath|scriptPath"
            }
        }
    }

    return $null
}

# Invoke a resolved path with args.
# If the resolved path uses the special "node|script" marker (format "nodePath|scriptPath") we call node with the script.
# If the path is a PowerShell wrapper (.ps1) we call it via pwsh/powershell -File to pass args predictably.
function Invoke-Resolved {
    param(
        [string]$path,
        [string[]]$args
    )

    if (-not $path) { throw "Invoke-Resolved: path is null or empty." }

    # node|script marker (used when Resolve-WindowsCommand returned a combined value for npm fallback)
    if ($path -like "*|*") {
        $parts = $path.Split("|",2)
        $nodePath = $parts[0]
        $scriptPath = $parts[1]
        & $nodePath $scriptPath @args
        return $LASTEXITCODE
    }

    if ($path -match '\.ps1$') {
        # prefer pwsh if available, otherwise use powershell.exe
        $pwsh = Get-Command pwsh -ErrorAction SilentlyContinue
        if ($pwsh) {
            & $pwsh.Path -NoProfile -ExecutionPolicy Bypass -File $path @args
            return $LASTEXITCODE
        } else {
            & "powershell.exe" -NoProfile -ExecutionPolicy Bypass -File $path @args
            return $LASTEXITCODE
        }
    } elseif ($path -match '\.js$') {
        # If a raw .js script was returned, call via node
        $node = Resolve-WindowsCommand -name "node" -projectRoot $PSScriptRoot
        if (-not $node) { throw "Node not found to run JS script $path" }
        & $node $path @args
        return $LASTEXITCODE
    } else {
        # .cmd, .exe, or plain script: call directly
        & $path @args
        return $LASTEXITCODE
    }
}

# If ProjectPath not provided, use the script's directory when executed as a file.
if ([string]::IsNullOrWhiteSpace($ProjectPath)) {
    if ($PSScriptRoot) {
        $ProjectPath = $PSScriptRoot
    } else {
        # Fallback if run in interactive session
        $ProjectPath = (Get-Location).Path
    }
}

try {
    $ProjectFull = Resolve-Path -Path $ProjectPath -ErrorAction Stop
    $ProjectFull = $ProjectFull.Path
} catch {
    Write-Error "ProjectPath '$ProjectPath' does not exist or cannot be resolved."
    exit 2
}

if (-not $OutputWar) { $OutputWar = "" }  # temporarily, will resolve after AppName detection

$ContextPath = Normalize-ContextPath -p $ContextPath

# Detect Angular project name and outputPath from angular.json
$AngularJsonPath = Join-Path -Path $ProjectFull -ChildPath "angular.json"
if (-not (Test-Path -LiteralPath $AngularJsonPath)) {
    Write-Error "angular.json not found at '$AngularJsonPath'. Ensure ProjectPath points to Angular workspace root."
    exit 2
}

$ng = Get-Content -LiteralPath $AngularJsonPath -Raw | ConvertFrom-Json
if (-not $AppName) {
    if ($ng.defaultProject) {
        $AppName = [string]$ng.defaultProject
    } elseif ($ng.projects) {
        $projNames = @($ng.projects.PSObject.Properties | Select-Object -ExpandProperty Name)
        if ($projNames.Count -gt 0) { $AppName = $projNames[0] }
    }
}
if (-not $AppName) { $AppName = "app" }

$projectNode = $ng.projects.$AppName
if (-not $projectNode) {
    Write-Warning "Project '$AppName' not found in angular.json. Falling back to 'dist/$AppName'."
    $OutputPathConfigured = (Join-Path "dist" $AppName)
} else {
    $OutputPathConfigured = $projectNode.architect.build.options.outputPath
    if (-not $OutputPathConfigured) { $OutputPathConfigured = (Join-Path "dist" $AppName) }
}

# Resolve output WAR path now that AppName is known
if ([string]::IsNullOrWhiteSpace($OutputWar)) {
    $OutputWar = Join-Path -Path $ProjectFull -ChildPath ("$AppName.war")
} else {
    $resolved = Resolve-Path -LiteralPath $OutputWar -ErrorAction SilentlyContinue
    if ($resolved) { $OutputWar = $resolved.Path }
    else { $OutputWar = (Join-Path -Path $ProjectFull -ChildPath $OutputWar) }
}

# Derived paths
$DistRelative = $OutputPathConfigured
$DistFull = Join-Path -Path $ProjectFull -ChildPath $DistRelative
$WarStaging = Join-Path -Path $ProjectFull -ChildPath "war"

Write-Host "Project: $ProjectFull"
Write-Host "AppName: $AppName"
Write-Host "Build config: $Configuration"
Write-Host "Context path (base-href): $ContextPath"
Write-Host "Dist (target): $DistFull"
Write-Host "War staging dir: $WarStaging"
Write-Host "Output WAR: $OutputWar"
Write-Host ""

# Safety: remove staging if Force specified
if (Test-Path $WarStaging) {
    if ($Force) {
        Write-Host "Removing existing staging folder because -Force was specified..."
        Remove-Item -Path $WarStaging -Recurse -Force
    } else {
        Write-Error "Staging folder '$WarStaging' already exists. Use -Force to overwrite."
        exit 3
    }
}

# Optionally run npm install (invoke robustly on Windows)
if ($NoNpmInstall) { $RunNpmInstall = $false }
if ($Zip) { $UseJar = $false }
if ($RunNpmInstall) {
    Write-Host "Running npm install in $ProjectFull ..."
    Push-Location $ProjectFull

    $npmPath = Resolve-WindowsCommand -name "npm" -projectRoot $ProjectFull
    if (-not $npmPath) {
        Write-Error "npm not found (neither global nor local). Install Node.js or ensure npm is available."
        Pop-Location
        exit 4
    }

    Write-Host "Using npm at: $npmPath"
    $npmExit = Invoke-Resolved -path $npmPath -args @("install")

    if ($null -eq $npmExit) { $npmExit = 1 }
    if ($npmExit -ne 0) {
        Write-Error "npm install failed with exit code $npmExit."
        Pop-Location
        exit 5
    }

    Pop-Location
}

if (-not $SkipBuild) {
    # Build using local Angular CLI if available to avoid npx prompts/hangs.
    # Respect angular.json outputPath; do not override.
    Write-Host "Building Angular app (preferring local ng) --configuration $Configuration --base-href $ContextPath ..."
    Push-Location $ProjectFull

    $localNg = Join-Path -Path $ProjectFull -ChildPath "node_modules\.bin\ng.cmd"
    $useLocalNg = Test-Path -LiteralPath $localNg

    # Disable analytics/prompts to prevent hangs
    $prevAnalytics = $env:NG_CLI_ANALYTICS
    $prevCI = $env:CI
    $env:NG_CLI_ANALYTICS = "false"
    $env:CI = "true"

    try {
        if ($useLocalNg) {
            Write-Host "Using local Angular CLI: $localNg"
            $buildArgs = @("build", "--configuration", $Configuration, "--base-href", $ContextPath)
            $buildExit = Invoke-Resolved -path $localNg -args $buildArgs
        } else {
            $npxPath = Resolve-WindowsCommand -name "npx" -projectRoot $ProjectFull
            if (-not $npxPath) {
                Write-Error "npx not found (neither local ng nor npx available). Run npm install or ensure npx is on PATH."
                Pop-Location
                exit 6
            }
            Write-Host "Local ng not found. Falling back to npx: $npxPath"
            $buildArgs = @("ng", "build", "--configuration", $Configuration, "--base-href", $ContextPath)
            $buildExit = Invoke-Resolved -path $npxPath -args $buildArgs
        }

        if ($null -eq $buildExit) { $buildExit = 1 }
        if ($buildExit -ne 0) {
            Write-Warning "ng build reported exit code $buildExit. Will proceed only if output exists and -IgnoreBudgetErrors is set."
        }
    } finally {
        $env:NG_CLI_ANALYTICS = $prevAnalytics
        $env:CI = $prevCI
        Pop-Location
    }
} else {
    Write-Host "Skipping ng build due to -SkipBuild switch."
}

# Verify dist exists
if (-not (Test-Path -Path $DistFull)) {
    Write-Error "Expected build output not found at '$DistFull'. Build may have failed or output path differs."
    exit 8
}
if ((-not $SkipBuild) -and ($buildExit -ne 0) -and (-not $IgnoreBudgetErrors)) {
    Write-Error "Build failed (exit $buildExit) and -IgnoreBudgetErrors is not set. Aborting."
    exit 7
}

# Prepare WAR staging folder
Write-Host "Creating staging folder $WarStaging ..."
New-Item -Path $WarStaging -ItemType Directory -Force | Out-Null

# Copy build output into root of staging folder (prefer browser/ when SSR is enabled)
$BrowserPath = Join-Path -Path $DistFull -ChildPath "browser"
$CopySource = if (Test-Path -Path $BrowserPath) { $BrowserPath } else { $DistFull }
Write-Host "Copying files from $CopySource to $WarStaging ..."
Copy-Item -Path (Join-Path $CopySource "*") -Destination $WarStaging -Recurse -Force

# Create WEB-INF and web.xml
$WEBINF = Join-Path -Path $WarStaging -ChildPath "WEB-INF"
if (-not (Test-Path $WEBINF)) {
    New-Item -Path $WEBINF -ItemType Directory | Out-Null
}

$webxmlPath = Join-Path -Path $WEBINF -ChildPath "web.xml"
$webXmlContent = @"
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                             http://xmlns.jcp.org/xml/ns/javaee/web-app_3_0.xsd"
         version="3.0">

  <!-- Serve index.html as welcome file -->
  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
  </welcome-file-list>

  <!-- SPA fallback: on 404 return index.html so Angular router can handle deep links -->
  <error-page>
    <error-code>404</error-code>
    <location>/index.html</location>
  </error-page>

</web-app>
"@

if ((Test-Path $webxmlPath) -and (-not $Force)) {
    Write-Host "WEB-INF/web.xml already exists at $webxmlPath (use -Force to overwrite). Skipping creation."
} else {
    Write-Host "Creating WEB-INF/web.xml ..."
    $webXmlContent | Out-File -FilePath $webxmlPath -Encoding UTF8 -Force
}

# Create WAR
$jarCmd = Get-Command jar -ErrorAction SilentlyContinue
if ($UseJar -and $jarCmd) {
    Write-Host "Using JDK 'jar' to create WAR..."
    $outDir = Split-Path -Path $OutputWar -Parent
    if ($outDir -and -not (Test-Path $outDir)) {
        New-Item -Path $outDir -ItemType Directory -Force | Out-Null
    }
    Push-Location $WarStaging
    $jarArgs = @("-cvf", $OutputWar, ".")
    $proc = Start-Process -FilePath jar -ArgumentList $jarArgs -NoNewWindow -Wait -PassThru
    Pop-Location
    if ($proc.ExitCode -ne 0) {
        Write-Error "'jar' reported exit code $($proc.ExitCode)."
        exit 9
    }
} else {
    if ($UseJar -and -not $jarCmd) {
        Write-Warning "'-UseJar' requested but 'jar' not found in PATH. Falling back to Compress-Archive."
    } else {
        Write-Host "Using Compress-Archive to create WAR (ZIP format)."
    }

    if ((Test-Path $OutputWar) -and $Force) {
        Remove-Item -Path $OutputWar -Force
    } elseif ((Test-Path $OutputWar) -and -not $Force) {
        Write-Error "Output WAR '$OutputWar' already exists. Use -Force to overwrite."
        exit 10
    }

    $tempZip = [System.IO.Path]::GetTempFileName() + ".zip"
    Write-Host "Compressing $WarStaging -> $tempZip ..."
    Compress-Archive -Path (Join-Path $WarStaging "*") -DestinationPath $tempZip -Force

    Move-Item -Path $tempZip -Destination $OutputWar -Force
}

Write-Host ""
Write-Host "WAR created at: $OutputWar"
Write-Host "You can deploy this WAR to Tomcat (drop into webapps/) or another servlet container. If you want this to be root, name it ROOT.war and build with ContextPath '/'."

Write-Host ""
Write-Host "Verification:"
if ($jarCmd) {
    Write-Host "  jar -tf `"$OutputWar`"   # list WAR contents (if jar available)"
} else {
    Write-Host "  Expand-Archive -Path `"$OutputWar`" -DestinationPath `".\war-check`"  # extract and inspect"
}
Write-Host ""
Write-Host "Done."
exit 0