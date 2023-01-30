import { Component, Input } from '@angular/core';
import { AppointmentEntity } from '@domain/entities/appointment/appointment_entity';
import { AppointmentStatusEnum, appointmentStatusIcons, appointmentStatusToString } from '@domain/models/appointment/appointment_status.enum';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss'],
})
export class AppointmentCardComponent {

  @Input()
  public appointment: AppointmentEntity = new AppointmentEntity({
    id: 1,
    createdAt: new Date(2022, 10, 5, 2, 30),
    updatedAt: new Date(2022, 10, 5, 2, 30),
    userId: 1,
    complaint: 'complaint',
    symptoms: 'symptoms',
    startsAt: new Date(),
    endsAt: new Date(),
    status: AppointmentStatusEnum.PENDING,
    isUnderMedicalTreatment: false,
    isPregnant: false,
    pregnantWeeks: 0,
  });

  public get isCompleted(): boolean {
    return this.appointment.status === AppointmentStatusEnum.COMPLETED;
  }

  public get isScheduled(): boolean {
    return this.appointment.status === AppointmentStatusEnum.SCHEDULED;
  }

  public get isPending(): boolean {
    return this.appointment.status === AppointmentStatusEnum.PENDING;
  }

  public get isCanceled(): boolean {
    return this.appointment.status === AppointmentStatusEnum.REPROVED;
  }

  public get status(): string {
    return appointmentStatusToString[this.appointment.status];
  }

  public get iconUrl(): string {
    return appointmentStatusIcons[this.appointment.status];
  }

  public get symptoms(): string[] {
    return this.appointment.symptoms.split(',');
  }

}
