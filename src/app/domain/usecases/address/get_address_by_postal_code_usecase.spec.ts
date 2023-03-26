import { mockedAddressEntity } from './../../../../test/mocks/address/address_entity_mock';
import { GetAddressByPostalCodeUsecase } from './get_address_by_postal_code_usecase';
import { PostalCodeRepositoryInterface } from '@domain/contracts/repositories';
import { AddressValidators } from '@domain/validators/address/address_validators';
import { ValidationError } from '@domain/errors/validation_error';

describe('GetAddressByPostalCodeUsecase', () => {
  let usecase: GetAddressByPostalCodeUsecase;
  let repository: jasmine.SpyObj<PostalCodeRepositoryInterface>;

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
