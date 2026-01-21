import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SesionesModule } from './sesiones/sesiones.module';
import { OperacionesModule } from './operaciones/operaciones.module';
import { CategoriasModule } from './categorias/categorias.module';

@NgModule({
  declarations: [],
  imports: [
    AppComponent,
    LoginComponent,
    MatCardModule,
    MatButtonModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    SesionesModule,
    RouterModule,
    UsuariosModule,
    OperacionesModule,
    CategoriasModule,
  ],
  exports: [AppComponent, LoginComponent],
  providers: [CookieService],
  bootstrap: [],
})
export class AppModule {}
