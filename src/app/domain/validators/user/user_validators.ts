export class UserValidators {
    public static password(value: string): boolean {
        return value.trim().length >= 6;
    }
}