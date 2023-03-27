import { AddressEntity } from '@domain/entities/address/address_entity';
import { AddressByPostalCodeDto } from '@infra/models/address/dto/address_by_postal_code_dto';

export abstract class PostalCodeDatasourceInterface {
  abstract getAddressByPostalCode(postalCode: string): Promise<AddressByPostalCodeDto>;
}
