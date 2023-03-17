import { UserValidators } from "@domain/validators/user/user_validators";

describe('UserValidators', () => {
  describe('Password', () => {
    it('should pass if the password is valid', () => {
      const isValid = UserValidators.isValidPassword('123456');

      expect(isValid).toBeTrue();
    });

    it('should not pass if the password is invalid', () => {
      const isValid = UserValidators.isValidPassword('123');

      expect(isValid).toBeFalse();
    });
  });

  describe('Email', () => {
    it('should pass if the email is valid', () => {
      const isValid = UserValidators.isValidEmail('email@email.com');

      expect(isValid).toBeTrue();
    });

    it('should not pass if the email is invalid', () => {
      const isValid = UserValidators.isValidEmail('email.com');

      expect(isValid).toBeFalse();
    });
  });

  describe('Name', () => {
    it('should pass if the name is valid', () => {
      const isValid = UserValidators.isValidName('Testing Name');

      expect(isValid).toBeTrue();
    });

    it('should not pass if the name have less than 3 letters', () => {
      const isValid = UserValidators.isValidName('..');

      expect(isValid).toBeFalse();
    });

    it('should not pass if the name have more than 1024 letters', () => {
      const isValid = UserValidators.isValidName('.'.repeat(1025));

      expect(isValid).toBeFalse();
    });
  });

  describe('Phone', () => {
    it('should pass if the phone is valid', () => {
      const isValid = UserValidators.isValidPhone('15993749521');

      expect(isValid).toBeTrue();
    });

    it('should not pass if the phone is empty', () => {
      const isValid = UserValidators.isValidPhone(' ');

      expect(isValid).toBeFalse();
    });
  });

  describe('Birthdate', () => {
    it('should pass if the birthdate is valid', () => {
      const age = 18;
      const birthDate = new Date(new Date().getFullYear() - age, new Date().getMonth(), new Date().getDate());

      const isValid = UserValidators.isValidBirthDate(birthDate);

      expect(isValid).toBeTrue();
    });

    it('should pass if it is exactly 10 years old', () => {
      const age = 10;
      const birthDate = new Date(new Date().getFullYear() - age, new Date().getMonth(), new Date().getDate());

      const isValid = UserValidators.isValidBirthDate(birthDate);

      expect(isValid).toBeTrue();
    });

    it('should not pass if it is less than 10 years old', () => {
      const age = 9;
      const birthDate = new Date(new Date().getFullYear() - age, new Date().getMonth(), new Date().getDate());

      const isValid = UserValidators.isValidBirthDate(birthDate);

      expect(isValid).toBeFalse();
    });
  });
});
