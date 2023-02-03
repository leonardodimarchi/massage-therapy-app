import { AppointmentStatusEnum } from '@domain/models/appointment/appointment_status.enum';
import { AppointmentEntity } from '@domain/entities/appointment/appointment_entity';

const id = 1;
const createdAt = new Date(2022, 10, 5, 2, 30);
const updatedAt = new Date(2022, 10, 5, 2, 30);

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
