import { AppointmentStatusEnum } from '@domain/models/appointment/appointment-status.enum';
import { AppointmentEntity } from '@domain/entities/appointment/appointment_entity';

const id = 1;
const createdAt = new Date();
const updatedAt = new Date();

const userId = 2;

const complaint = 'complaint';
const symptoms = 'symptoms';
const startsAt = new Date();
const endsAt = new Date();
const status = AppointmentStatusEnum.PENDING;

const isUnderMedicalTreatment = false;
const isPregnant = false;
const pregnantWeeks = 0;

export const mockedAppointmentEntity = new AppointmentEntity({
  id,
  createdAt,
  updatedAt,
  userId,
  complaint,
  symptoms,
  startsAt,
  endsAt,
  status,
  isUnderMedicalTreatment,
  isPregnant,
  pregnantWeeks,
})
