import { AppointmentDto } from '@infra/models/appointment/dto/appointment_dto';
import { AppointmentStatusEnum } from "@domain/models/appointment/appointment-status.enum";

const id = 1;
const createdAt = '2022-11-05T05:30:00.000Z';
const updatedAt = '2022-11-05T05:30:00.000Z';

const userId = 2;

const complaint = 'complaint';
const symptoms = 'symptoms';
const startsAt = new Date();
const endsAt = new Date();
const status = AppointmentStatusEnum.PENDING;

const isUnderMedicalTreatment = false;
const isPregnant = false;
const pregnantWeeks = 0;

export const mockedAppointmentDto: AppointmentDto = {
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
}

