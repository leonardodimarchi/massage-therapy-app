import { CepProvider } from '@infra/contracts/providers/cep_provider';
import { AddressDatasourceInterface } from "@infra/contracts/datasources";
import { AddressByPostalCodeDto } from "@infra/models/address/dto/address_by_postal_code_dto";

export class AddressDatasource implements AddressDatasourceInterface {

  constructor(
    private readonly cepProvider: CepProvider,
  ) { }

  async getAddressByPostalCode(postalCode: string): Promise<AddressByPostalCodeDto> {
    return await this.cepProvider.getAddress(postalCode);
  }

}
