import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, RouterModule, LoginComponent],
  providers: [LoginService],
  exports: [LoginComponent],
})
export class LoginModule {}
