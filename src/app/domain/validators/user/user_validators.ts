export class UserValidators {
    public static password(value: string): boolean {
        return value.trim().length >= 6;
    }

    public static email(value: string): boolean {
        const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');

        return regex.test(value);
    }
}