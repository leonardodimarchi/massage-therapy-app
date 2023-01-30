import { UserRepositoryInterface } from "@domain/contracts/repositories";
import { RegisterUsecase } from "./register_usecase";

describe('RegisterUsecase', () => {
  let usecase: RegisterUsecase;
  let repository: jasmine.SpyObj<UserRepositoryInterface>;

  beforeEach(() => {
    repository = jasmine.createSpyObj('UserRepositoryInterface', ['login']);

    usecase = new RegisterUsecase(repository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });
});
