import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { UserGenderEnum } from "@domain/models/user/user_gender.enum";
import { FormGroupFrom } from "@presenter/models/interfaces/common/form-group-from";
import { RegisterForm } from "@presenter/models/interfaces/pages/register/register-form";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.createForm();
  }

  public form: FormGroupFrom<RegisterForm>;

  public isLoading: boolean = false;

  public isShowingPassword: boolean = false;

  public isShowingConfirmationPassword: boolean = false;

  private createForm(): FormGroupFrom<RegisterForm> {
    return this.formBuilder.nonNullable.group({
      basicInformation: this.formBuilder.nonNullable.group({
        email: [''],
        name: [''],
        phone: [''],
        password: [''],
        passwordConfirmation: [''],
      }),
      personalInformation: this.formBuilder.nonNullable.group({
        birthDate: [],
        diseaseHistory: [''],
        gender: [UserGenderEnum.FEMALE],
      }),
      address: this.formBuilder.nonNullable.group({
        postalCode: [''],
        state: [''],
        city: [''],
        neighborhood: [''],
        street: [''],
        houseNumber: [0],
      })
    });
  }
}
