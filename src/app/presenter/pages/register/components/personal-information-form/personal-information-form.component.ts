import { UserGenderEnum } from '@domain/models/user/user_gender.enum';
import { PillSelectItem } from '@presenter/components/pill-select/pill-select.component';
import { Component } from '@angular/core';
import { NestedFormGroup } from '@presenter/components/shared/nested-form-group';
import { PersonalInformationForm } from '@presenter/models/pages/register/personal-information-form';

@Component({
  selector: 'app-personal-information-form',
  templateUrl: './personal-information-form.component.html',
  styleUrls: ['./personal-information-form.component.scss'],
})
export class PersonalInformationFormComponent extends NestedFormGroup<PersonalInformationForm> {

  public genders: PillSelectItem<UserGenderEnum>[] = [
    { label: UserGenderEnum.getName(UserGenderEnum.MALE), value: UserGenderEnum.MALE },
    { label: UserGenderEnum.getName(UserGenderEnum.FEMALE), value: UserGenderEnum.FEMALE },
  ];

}
