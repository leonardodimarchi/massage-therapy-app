import { UserGenderEnum } from './../../../../../domain/models/user/user_gender.enum';
import { PillSelectItem } from './../../../../components/pill-select/pill-select.component';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-personal-information-form',
  templateUrl: './personal-information-form.component.html',
  styleUrls: ['./personal-information-form.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class PersonalInformationFormComponent {
  @Input()
  public formGroupName: string = '';

  public genders: PillSelectItem<UserGenderEnum>[] = [
    { label: UserGenderEnum.getName(UserGenderEnum.MALE), value: UserGenderEnum.MALE },
    { label: UserGenderEnum.getName(UserGenderEnum.FEMALE), value: UserGenderEnum.FEMALE },
  ]
}
