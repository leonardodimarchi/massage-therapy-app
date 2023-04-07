import { AddressValidators } from "./address_validators";

describe('AddressValidators', () => {
  describe('PostalCode', () => {
    it('should pass if the length is 8', () => {
      const isValid = AddressValidators.isValidPostalCode('18954713');

      expect(isValid).toBeTrue();
    });

    it('should not pass if it has less than 8 characters', () => {
      const isValid = AddressValidators.isValidPostalCode('123');

      expect(isValid).toBeFalse();
    });

    it('should not pass if it has more than 8 characters', () => {
      const isValid = AddressValidators.isValidPostalCode('123456789');

      expect(isValid).toBeFalse();
    });
  });
});
