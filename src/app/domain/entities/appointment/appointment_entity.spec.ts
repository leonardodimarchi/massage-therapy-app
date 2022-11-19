import { AppointmentStatusEnum } from '@domain/models/appointment/appointment-status.enum';
import { AppointmentEntity } from './appointment_entity';
describe('AppointmentEntity', () => {
  it('should create with correct properties', () => {
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

    const appointment = new AppointmentEntity({
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
    });

    expect(appointment.id).toEqual(id);
    expect(appointment.createdAt).toEqual(createdAt);
    expect(appointment.updatedAt).toEqual(updatedAt);
    expect(appointment.userId).toEqual(userId);
    expect(appointment.complaint).toEqual(complaint);
    expect(appointment.symptoms).toEqual(symptoms);
    expect(appointment.startsAt).toEqual(startsAt);
    expect(appointment.endsAt).toEqual(endsAt);
    expect(appointment.status).toEqual(status);
    expect(appointment.isUnderMedicalTreatment).toEqual(isUnderMedicalTreatment);
    expect(appointment.isPregnant).toEqual(isPregnant);
    expect(appointment.pregnantWeeks).toEqual(pregnantWeeks);
  });
});
