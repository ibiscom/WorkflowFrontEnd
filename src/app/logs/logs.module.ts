import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogsComponent } from './logs.component';
import { LogsService } from './logs.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, RouterModule, LogsComponent],
  providers: [LogsService],
  exports: [LogsComponent],
})
export class LogsModule {}
