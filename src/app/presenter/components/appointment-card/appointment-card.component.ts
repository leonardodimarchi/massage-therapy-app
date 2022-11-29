import { Component, Input } from '@angular/core';
import { AppointmentEntity } from '@domain/entities/appointment/appointment_entity';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss'],
})
export class AppointmentCardComponent {

  @Input()
  public appointment!: AppointmentEntity;

}
