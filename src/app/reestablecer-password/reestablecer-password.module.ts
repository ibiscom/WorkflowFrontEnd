import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';
import { RouterModule } from '@angular/router';
import { NuevoPasswordComponent } from './nuevo-password/nuevo-password.component';
import { ReestablecerPasswordComponent } from './reestablecer-password.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NuevoPasswordComponent,
    ReestablecerPasswordComponent,
  ],
  providers: [],
})
export class ReestablecerPasswordModule {}
