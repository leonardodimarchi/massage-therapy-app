import { UserEntity } from "../../entities/user/user_entity";

export interface Unsubscribable {
    unsubscribe: () => void;
}

export type UserSubscriptionListener = (user: UserEntity | null) => Promise<void> | void;

export abstract class UserServiceInterface {
    abstract subscribeLoggedUserForChanges(listener: UserSubscriptionListener): Unsubscribable;
    abstract setLoggedUser(user: UserEntity): void;
}