export class AddressValidators {
  public static isValidPostalCode(value: string): boolean {
    const regex = new RegExp(/^\d{8}$/gm);

    return regex.test(value);
  }
}
