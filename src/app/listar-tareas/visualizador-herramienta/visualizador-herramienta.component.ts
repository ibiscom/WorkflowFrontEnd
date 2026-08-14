import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'ibpm-visualizador-herramienta',
  imports: [],
  templateUrl: './visualizador-herramienta.component.html',
  styleUrl: './visualizador-herramienta.component.scss'
})
export class VisualizadorHerramientaComponent implements OnInit {

  @Input() infoHerramienta: any;
  public urlSegura?: SafeResourceUrl;
  public iframeHeight: string = '400px';
  private infoHerramientaCodificada: string = '';

  constructor(private sanitizer: DomSanitizer) {
  }

  public ngOnInit() {
    this.codificarInfoHerramienta();
    const urlDinamicaRecibida = `http://localhost:63417/htm/invocar-componente-captura/${this.infoHerramientaCodificada}`;
    this.urlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(urlDinamicaRecibida);
  }
private lastAppliedHeight = 0;

@HostListener('window:message', ['$event'])
public onWindowMessage(event: MessageEvent): void {
  const originHostname = event.origin ? new URL(event.origin).hostname : '';
  const isLocalhost =
    originHostname === 'localhost' ||
    originHostname === '127.0.0.1' ||
    originHostname === '0.0.0.0';

  if (!isLocalhost || !event.data || typeof event.data !== 'object') {
    return;
  }

  if (event.data.type !== 'iframe-height') {
    return;
  }

  const height = Number(event.data.height);

  if (!Number.isFinite(height)) {
    return;
  }

  const next = Math.max(height, 220);

  if (Math.abs(next - this.lastAppliedHeight) < 5) {
    return;
  }

  this.lastAppliedHeight = next;
  this.iframeHeight = `${next}px`;
}


  @HostListener('window:resize')
  public onWindowResize(): void {
    setTimeout(() => this.ajustarAlturaIframe(), 150);
  }

  public onIframeLoad(): void {
    setTimeout(() => this.ajustarAlturaIframe(), 200);
  }

  public ajustarAlturaIframe(): void {
    const iframe = document.querySelector('iframe') as HTMLIFrameElement | null;

    if (!iframe) {
      return;
    }

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        return;
      }

      const alturaContenido = Math.max(
        iframeDoc.body?.scrollHeight ?? 0,
        iframeDoc.documentElement?.scrollHeight ?? 0,
        iframeDoc.body?.offsetHeight ?? 0,
        iframeDoc.documentElement?.offsetHeight ?? 0,
        400
      );

      this.iframeHeight = `${alturaContenido}px`;
    } catch {
      this.iframeHeight = '400px';
    }
  }

  private codificarInfoHerramienta(): void {
    const jsonHerramienta = JSON.stringify(this.infoHerramienta ?? {});
    const bytes = new TextEncoder().encode(jsonHerramienta);
    let binary = '';

    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });

    const base64 = btoa(binary);

    this.infoHerramientaCodificada = base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');
  }
}
