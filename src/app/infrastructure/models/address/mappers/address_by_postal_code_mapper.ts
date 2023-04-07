import { AddressByPostalCodeDto } from './../dto/address_by_postal_code_dto';
import { AddressEntity } from '@domain/entities/address/address_entity';
import { Mapper } from "@infra/models/shared/mappers/mapper";

export class AddressByPostalCodeMapper implements Mapper<AddressEntity> {
  private props: AddressByPostalCodeDto;

  constructor(props: AddressByPostalCodeDto) {
    this.props = props;
  }

  toEntity(): AddressEntity {
    const {
      cep,
      city,
      neighborhood,
      state,
      street,
    } = this.props;

    return new AddressEntity({
      postalCode: cep,
      city,
      neighborhood,
      state,
      street,
    });
  }
}
