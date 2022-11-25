import { BaseEntity, BaseEntityProps } from "@domain/entities/shared/base_entity";
import { AppointmentStatusEnum } from "@domain/models/appointment/appointment-status.enum";

export interface AppointmentEntityProps extends BaseEntityProps {
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

export class AppointmentEntity extends BaseEntity<AppointmentEntityProps> {

  constructor(props: AppointmentEntityProps) {
    super(props);
  }

  public set userId(value: number) {
    this.props.userId = value;
  }

  public set complaint(value: string) {
    this.props.complaint = value;
  }

  public set symptoms(value: string) {
    this.props.symptoms = value;
  }

  public set startsAt(value: Date) {
    this.props.startsAt = value;
  }

  public set endsAt(value: Date) {
    this.props.endsAt = value;
  }

  public set status(value: AppointmentStatusEnum) {
    this.props.status = value;
  }

  public set isUnderMedicalTreatment(value: boolean) {
    this.props.isUnderMedicalTreatment = value;
  }

  public set isPregnant(value: boolean) {
    this.props.isPregnant = value;
  }

  public set pregnantWeeks(value: number) {
    this.props.pregnantWeeks = value;
  }

  public get userId() {
    return this.props.userId;
  }

  public get complaint() {
    return this.props.complaint;
  }

  public get symptoms() {
    return this.props.symptoms;
  }

  public get startsAt() {
    return this.props.startsAt;
  }

  public get endsAt() {
    return this.props.endsAt;
  }

  public get status() {
    return this.props.status;
  }

  public get isUnderMedicalTreatment() {
    return this.props.isUnderMedicalTreatment;
  }

  public get isPregnant() {
    return this.props.isPregnant;
  }

  public get pregnantWeeks() {
    return this.props.pregnantWeeks;
  }
}
