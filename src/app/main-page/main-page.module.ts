import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { MainPageComponent } from './main-page.component';

@NgModule({
  imports: [RouterModule, CommonModule, MenuComponent, MainPageComponent],
  exports: [MenuComponent, MainPageComponent],
  providers: [LoginService, CookieService],
})
export class MainPageModule {}
