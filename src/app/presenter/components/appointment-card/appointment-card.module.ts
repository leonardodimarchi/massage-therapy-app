import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentCardComponent } from './appointment-card.component';
import { PillModule } from '../pill/pill.module';

@NgModule({
  imports: [
    CommonModule,
    PillModule,
  ],
  declarations: [
    AppointmentCardComponent,
  ],
  exports: [
    AppointmentCardComponent,
  ],
})
export class AppointmentCardModule { }
