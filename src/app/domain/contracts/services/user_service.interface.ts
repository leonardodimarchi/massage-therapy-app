import { UserEntity } from "../../entities/user/user_entity";

export interface Unsubscribable {
    unsubscribe: () => any;
}

export type UserSubscriptionListener = (user: UserEntity) => Promise<void> | void;

export abstract class UserServiceInterface {
    abstract subscribeLoggedUserFroChanges(listener: UserSubscriptionListener): Unsubscribable;
    abstract setLoggedUser(user: UserEntity): void;
}