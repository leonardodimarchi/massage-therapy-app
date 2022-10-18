import { UserValidators } from "./user_validators";

describe('UserValidators', () => {
    describe('Password', () => {
        it('should pass if the password is valid', () => {
            const isValid = UserValidators.password('123456');

            expect(isValid).toBeTrue();
        });

        it('should not pass if the password is invalid', () => {
            const isValid = UserValidators.password('123');

            expect(isValid).toBeFalse();
        });
    });

    describe('Email', () => {
        it('should pass if the email is valid', () => {
            const isValid = UserValidators.email('email@email.com');

            expect(isValid).toBeTrue();
        });

        it('should not pass if the email is invalid', () => {
            const isValid = UserValidators.email('email.com');

            expect(isValid).toBeFalse();
        });
    });
});