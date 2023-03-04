import { UserValidators } from '@domain/validators/user/user_validators';
import { FormControl, ValidationErrors } from "@angular/forms";

export namespace FormValidators {
  export function name(control: FormControl): ValidationErrors | null {
    const value = control.value;

    if (UserValidators.isValidName(value))
      return null;

    return { name: true };
  }

  export function phone(control: FormControl): ValidationErrors | null {
    const value = control.value;

    if (UserValidators.isValidPhone(value))
      return null;

    return { phone: true };
  }
}
