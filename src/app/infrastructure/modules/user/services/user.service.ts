import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageServiceInterface } from 'src/app/domain/contracts/services/storage_service.interface';
import { Unsubscribable, UserServiceInterface, UserSubscriptionListener } from 'src/app/domain/contracts/services/user_service.interface';
import { JwtEntity } from 'src/app/domain/entities/auth/jwt_entity';
import { UserEntity } from 'src/app/domain/entities/user/user_entity';
import { storageKeys } from 'src/environments/storage_keys';

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

  async isLogged(): Promise<boolean> {
    const user = await this.storageService.get<UserEntity>(storageKeys.loggedUser);
  
    return !!user;
  }

  async setUpLoggedUser(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
