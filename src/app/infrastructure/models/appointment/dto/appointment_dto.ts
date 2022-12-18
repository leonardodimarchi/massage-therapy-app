import { AppointmentStatusEnum } from "@domain/models/appointment/appointment-status.enum";
import { BaseEntityDto } from "@infra/models/shared/dto/base_entity_dto";

export interface AppointmentDto extends BaseEntityDto {
  userId: number;

  complaint: string;
  symptoms: string;
  startsAt: Date;
  endsAt: Date;
  status: AppointmentStatusEnum;

  isUnderMedicalTreatment: boolean;
  isPregnant: boolean;
  pregnantWeeks: number;
}
