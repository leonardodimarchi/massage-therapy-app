import { UserRepositoryInterface } from "@domain/contracts/repositories";
import { UserGenderEnum } from "@domain/models/user/user_gender.enum";
import { RegisterUsecase, RegisterUseCaseInput } from "./register_usecase";

describe('RegisterUsecase', () => {
  let usecase: RegisterUsecase;
  let repository: jasmine.SpyObj<UserRepositoryInterface>;

  beforeEach(() => {
    repository = jasmine.createSpyObj('UserRepositoryInterface', ['login', 'register']);

    usecase = new RegisterUsecase(repository);
  });

  const input: RegisterUseCaseInput = {
    email: 'my.email@email.com',
    name: 'My name',
    phone: '15992485746',
    birthDate: new Date(),
    password: '123456',
    gender: UserGenderEnum.MALE,
    diseaseHistory: 'My history',
    state: 'SP',
    city: 'Sorocaba',
    postalCode: '18273648',
    neighborhood: 'My neighborhood',
    houseNumber: 123,
  }

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should call the repository register', async () => {
    await usecase.call(input);

    expect(repository.register).toHaveBeenCalledTimes(1);
  });
});
