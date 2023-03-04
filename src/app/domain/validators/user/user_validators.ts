export class UserValidators {
  public static isValidEmail(value: string): boolean {
    const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');

    return regex.test(value);
  }

  public static isValidName(value: string): boolean {
    const name = value.trim();

    return !!name.length && name.length >= 3 && name.length <= 1024;
  }

  public static isValidPassword(value: string): boolean {
    return value?.trim()?.length >= 6;
  }
}
