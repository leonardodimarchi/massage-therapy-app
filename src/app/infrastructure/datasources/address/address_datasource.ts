import { AddressDatasourceInterface } from "@infra/contracts/datasources";
import { AddressByPostalCodeDto } from "@infra/models/address/dto/address_by_postal_code_dto";
import { cep } from "cep-promise";

export class PostalCodeDatasource implements AddressDatasourceInterface {

  async getAddressByPostalCode(postalCode: string): Promise<AddressByPostalCodeDto> {
    return await cep(postalCode);
  }
  
}
