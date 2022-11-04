import { UserServiceInterface } from "@domain/contracts/services";
import { LogoutUsecase } from "./logout_usecase";

describe('LogoutUsecase', () => {
  let usecase: LogoutUsecase;
  let userServiceSpy: jasmine.SpyObj<UserServiceInterface>;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserServiceInterface', ['clearLoggedUser']);

    usecase = new LogoutUsecase(userServiceSpy);
  });

  it('should call user service clear method', async () => {
    await usecase.call();

    expect(userServiceSpy.clearLoggedUser).toHaveBeenCalledTimes(1);
  });
});
