import { JwtEntity } from "@domain/entities/auth/jwt_entity";
import { UserEntity } from "@domain/entities/user/user_entity";

export interface Unsubscribable {
    unsubscribe: () => void;
}

export type UserSubscriptionListener = (user: UserEntity | null) => Promise<void> | void;

export abstract class UserServiceInterface {
    abstract subscribeLoggedUserForChanges(listener: UserSubscriptionListener): Unsubscribable;
    abstract setLoggedUser(user: UserEntity): Promise<void>;
    abstract setJwt(token: JwtEntity): Promise<void>;
    abstract getJwt(): Promise<JwtEntity | null>;
    abstract isLogged(): Promise<boolean>;
    abstract setUpLoggedUser(): Promise<void>;
}
