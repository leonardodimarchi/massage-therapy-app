import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Unsubscribable, UserServiceInterface, UserSubscriptionListener } from 'src/app/domain/contracts/services/user_service.interface';
import { UserEntity } from 'src/app/domain/entities/user/user_entity';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserServiceInterface {

  private readonly loggedUserSubject: BehaviorSubject<UserEntity | null> = new BehaviorSubject<UserEntity | null>(null);

  subscribeLoggedUserForChanges(listener: UserSubscriptionListener): Unsubscribable {
    return this.loggedUserSubject.subscribe(listener);
  }

  setLoggedUser(user: UserEntity): void {
    this.loggedUserSubject.next(user);
  }
}
