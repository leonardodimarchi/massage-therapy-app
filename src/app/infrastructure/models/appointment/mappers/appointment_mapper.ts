import { AppointmentEntity } from "@domain/entities/appointment/appointment_entity";
import { Mapper } from "@infra/models/shared/mappers/mapper";
import { AppointmentDto } from "../dto/appointment_dto";

export class AppointmentMapper implements Mapper<AppointmentEntity> {
    private props: AppointmentDto;

    constructor(props: AppointmentDto) {
        this.props = props;
    }

    toEntity(): AppointmentEntity {
        const {
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
        } = this.props;

        return new AppointmentEntity({
            id,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
            userId,
            complaint,
            symptoms,
            startsAt: new Date(startsAt),
            endsAt: new Date(endsAt),
            status,
            isUnderMedicalTreatment,
            isPregnant,
            pregnantWeeks,
        });
    }
}
