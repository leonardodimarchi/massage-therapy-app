import { UserValidators } from '@domain/validators/user/user_validators';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

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

  export function birthDate(control: FormControl): ValidationErrors | null {
    const value = control.value;

    if (UserValidators.isValidBirthDate(value))
      return null;

    return { birthDate: true };
  }

  export function password(control: FormControl): ValidationErrors | null {
    const value = control.value;

    if (UserValidators.isValidPassword(value))
      return null;

    return { password: true };
  }

  export function mustMatch(controlName: string, matchingControlName: string): (group: AbstractControl) => any {
    return (group: AbstractControl) => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
      } else {
        matchingControl?.setErrors(null);
      }
    };
  }
}
