import { Injectable } from "@angular/core";
import { UserServiceInterface, StorageServiceInterface, UserSubscriptionListener } from "@domain/contracts/services";
import { JwtEntity } from "@domain/entities/auth/jwt_entity";
import { UserEntity } from "@domain/entities/user/user_entity";
import { storageKeys } from "@env/storage_keys";
import { BehaviorSubject, Unsubscribable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
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
    return await this.storageService.get<JwtEntity>(storageKeys.userToken);
  }

  async isLogged(): Promise<boolean> {
    const user = await this.storageService.get<UserEntity>(storageKeys.loggedUser);

    return !!user;
  }

  async setUpLoggedUser(): Promise<void> {
    const user = await this.storageService.get<UserEntity>(storageKeys.loggedUser);

    this.loggedUserSubject.next(user);
  }
}
