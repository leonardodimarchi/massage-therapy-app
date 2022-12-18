import { UserServiceInterface, StorageServiceInterface, UserSubscriptionListener } from "@domain/contracts/services";
import { JwtEntity } from "@domain/entities/auth/jwt_entity";
import { UserEntity, UserEntityProps } from "@domain/entities/user/user_entity";
import { storageKeys } from "@env/storage_keys";
import { BehaviorSubject, Unsubscribable } from "rxjs";

export class UserService implements UserServiceInterface {

  constructor(
    private readonly storageService: StorageServiceInterface,
  ) {}

  private readonly loggedUserSubject: BehaviorSubject<UserEntity | null> = new BehaviorSubject<UserEntity | null>(null);

  subscribeLoggedUserForChanges(listener: UserSubscriptionListener): Unsubscribable {
    return this.loggedUserSubject.subscribe(listener);
  }

  async setLoggedUser(user: UserEntity): Promise<void> {
    await this.storageService.set(storageKeys.loggedUser, user);
    this.loggedUserSubject.next(user);
  }

  async setJwt(token: JwtEntity): Promise<void> {
    await this.storageService.set(storageKeys.userToken, token);
  }

  async getJwt(): Promise<JwtEntity | null> {
    const jwtProps = await this.storageService.get<{ props: JwtEntity }>(storageKeys.userToken);

    if (!jwtProps)
      return null;

    return new JwtEntity(jwtProps.props);
  }

  async isLogged(): Promise<boolean> {
    const user = await this.storageService.get<{ props: UserEntityProps }>(storageKeys.loggedUser);

    return !!user;
  }

  async setUpLoggedUser(): Promise<void> {
    const user = await this.storageService.get<{ props: UserEntityProps }>(storageKeys.loggedUser);

    this.loggedUserSubject.next(user?.props ? new UserEntity(user.props) : null);
  }

  async clearLoggedUser(): Promise<void> {
    await this.storageService.clearAll();
    this.loggedUserSubject.next(null);
  }
}
