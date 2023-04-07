import { AddressByPostalCodeDto } from "@infra/models/address/dto/address_by_postal_code_dto";

export abstract class CepProvider {
  abstract getAddress(cep: string): Promise<AddressByPostalCodeDto>;
}
