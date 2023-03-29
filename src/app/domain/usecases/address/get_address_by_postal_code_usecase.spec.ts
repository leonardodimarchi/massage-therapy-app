import { GetAddressByPostalCodeUsecase } from './get_address_by_postal_code_usecase';
import { AddressRepositoryInterface } from '@domain/contracts/repositories';
import { AddressValidators } from '@domain/validators/address/address_validators';
import { ValidationError } from '@domain/errors/validation_error';
import { mockedAddressEntity } from '@mocks/address/address_entity_mock';

describe('GetAddressByPostalCodeUsecase', () => {
  let usecase: GetAddressByPostalCodeUsecase;
  let repository: jasmine.SpyObj<AddressRepositoryInterface>;

  beforeEach(() => {
    repository = jasmine.createSpyObj('PostalCodeRepositoryInterface', ['getAddressByPostalCode']);
    usecase = new GetAddressByPostalCodeUsecase(repository);
  });

  it('should instantiate the usecase', () => {
    expect(usecase).toBeDefined();
  });

  it('should get the results from the repository', async () => {
    repository.getAddressByPostalCode.and.resolveTo(mockedAddressEntity);

    const result = await usecase.call({ postalCode: '12345678' });

    expect(result).toEqual(mockedAddressEntity);
  });

  it('should throw error if the postal code is invalid', async () => {
    spyOn(AddressValidators, 'isValidPostalCode').and.returnValue(false);

    await expectAsync(usecase.call({ postalCode: '' })).toBeRejectedWithError(ValidationError);
  });
})
