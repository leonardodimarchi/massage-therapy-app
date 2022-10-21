import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Unsubscribable, UserServiceInterface, UserSubscriptionListener } from 'src/app/domain/contracts/services/user_service.interface';
import { UserEntity } from 'src/app/domain/entities/user/user_entity';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserServiceInterface {

  private readonly loggedUserSubject: BehaviorSubject<UserEntity | null> = new BehaviorSubject<UserEntity | null>(null);

  subscribeLoggedUserFroChanges(listener: UserSubscriptionListener): Unsubscribable {
    throw new Error('Method not implemented.');
  }

  setLoggedUser(user: UserEntity): void {
    this.loggedUserSubject.next(user);
  }
}
