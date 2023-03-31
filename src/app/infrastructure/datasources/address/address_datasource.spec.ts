import { AddressDatasourceInterface } from "@infra/contracts/datasources";
import { CepProvider } from "@infra/contracts/providers/cep_provider";
import { AddressDatasource } from "./address_datasource";
import { mockedAddressByPostalCodeDto } from "@mocks/address/address_entity_mock";

describe('AddressDatasource', () => {
    let datasource: AddressDatasourceInterface;
    let cepProvider: jasmine.SpyObj<CepProvider>;

    beforeEach(() => {
      cepProvider = jasmine.createSpyObj('CepProvider', ['getAddress']);
      datasource = new AddressDatasource(cepProvider);
    });

    it('should initialize', () => {
      expect(datasource).toBeDefined();
    });

    describe('getAddressByPostalCode', () => {
      it('should call the cep provider and return the address', async () => {
        cepProvider.getAddress.and.resolveTo(mockedAddressByPostalCodeDto);

        const result = await datasource.getAddressByPostalCode('12345678');

        expect(result).toEqual(mockedAddressByPostalCodeDto);
      });
    });
});
