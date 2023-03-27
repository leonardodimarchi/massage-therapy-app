import { AddressEntity } from '@domain/entities/address/address_entity';
import { mockedAddressEntity, mockedAddressByPostalCodeDto } from '@mocks/address/address_entity_mock';
import { PostalCodeRepository } from './postal_code_repository';
import { PostalCodeDatasourceInterface } from '@infra/contracts/datasources';
import { HttpErrorHandler } from '../shared/errors/http_error_handler';

describe('PostalCodeRepository', () => {
  let datasource: jasmine.SpyObj<PostalCodeDatasourceInterface>;
  let repository: PostalCodeRepository;

  beforeEach(() => {
    datasource = jasmine.createSpyObj('PostalCodeDatasourceInterface', ['getAddressByPostalCode']);
    repository = new PostalCodeRepository(datasource);
  });

  it('should return an AddressEntity from the datasource', async () => {
    datasource.getAddressByPostalCode.and.resolveTo(mockedAddressByPostalCodeDto);

    const result = await repository.getAddressByPostalCode('123456789');

    expect(result).toEqual(mockedAddressEntity);
    expect(result).toBeInstanceOf(AddressEntity);
  });

  it('should call the error handler if the datasource throws an error', async () => {
    const error = new Error('mocked');
    const errorHandlerSpy = spyOn(HttpErrorHandler, 'handle');

    datasource.getAddressByPostalCode.and.throwError(error);

    await repository.getAddressByPostalCode('123456789');

    expect(errorHandlerSpy).toHaveBeenCalledOnceWith(error);
  });
});
