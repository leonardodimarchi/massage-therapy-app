import { AddressDatasourceInterface } from "@infra/contracts/datasources";
import { AddressByPostalCodeDto } from "@infra/models/address/dto/address_by_postal_code_dto";

export class PostalCodeDatasource implements AddressDatasourceInterface {

  async getAddressByPostalCode(postalCode: string): Promise<AddressByPostalCodeDto> {
    throw new Error("Method not implemented.");
  }
  
}
