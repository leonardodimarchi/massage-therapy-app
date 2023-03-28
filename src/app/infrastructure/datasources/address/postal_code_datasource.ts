import { PostalCodeDatasourceInterface } from "@infra/contracts/datasources";
import { AddressByPostalCodeDto } from "@infra/models/address/dto/address_by_postal_code_dto";

export class PostalCodeDatasource implements PostalCodeDatasourceInterface {

  async getAddressByPostalCode(postalCode: string): Promise<AddressByPostalCodeDto> {
    throw new Error("Method not implemented.");
  }
  
}
