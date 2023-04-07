import { AddressByPostalCodeDto } from '@infra/models/address/dto/address_by_postal_code_dto';

export abstract class AddressDatasourceInterface {
  abstract getAddressByPostalCode(postalCode: string): Promise<AddressByPostalCodeDto>;
}
