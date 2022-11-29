import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentCardComponent } from './appointment-card.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AppointmentCardComponent,
  ],
  exports: [
    AppointmentCardComponent,
  ],
})
export class AppointmentCardModule { }
