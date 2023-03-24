import { PostalCodeRepositoryInterface } from '@domain/contracts/repositories';
import { GetAddressByCepUsecase } from './get_address_by_cep_usecase';

describe('GetAddressByCepUsecase', () => {
  let usecase: GetAddressByCepUsecase;
  let repository: jasmine.SpyObj<PostalCodeRepositoryInterface>;

  beforeEach(() => {
    repository = jasmine.createSpyObj('PostalCodeRepositoryInterface', ['getUserAppointments'])
    usecase = new GetAddressByCepUsecase(repository);
  });

  it('should instantiate the usecase', () => {
    expect(usecase).toBeDefined();
  });
})
