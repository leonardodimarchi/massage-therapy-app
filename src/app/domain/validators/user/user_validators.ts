export class UserValidators {
  public static isValidEmail(value: string): boolean {
    const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');

    return regex.test(value);
  }

  public static isValidName(value: string): boolean {
    const name = value.trim();

    return !!name.length && name.length >= 3 && name.length <= 1024;
  }

  public static isValidPhone(value: string): boolean {
    const phone = value.trim();

    return !!phone.length
  }

  public static isValidPassword(value: string): boolean {
    const password = value.trim();

    return password.length >= 6 && password.length <= 512;
  }

  public static isValidBirthDate(value: Date | string): boolean {
    const today = new Date();
    const minimumAge = 10;
    const tenYearsBackDate = new Date(today.getFullYear() - minimumAge, today.getMonth(), today.getDate());

    return tenYearsBackDate.getTime() >= new Date(value).getTime();
  }
}
