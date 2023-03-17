import { Component } from '@angular/core';
import { NestedFormGroup } from '@presenter/components/shared/nested-form-group';
import { BasicInformationForm } from '@presenter/models/pages/register/basic-information-form';

@Component({
  selector: '[formGroup] app-basic-information-form',
  templateUrl: './basic-information-form.component.html',
  styleUrls: ['./basic-information-form.component.scss'],
})
export class BasicInformationFormComponent extends NestedFormGroup<BasicInformationForm> {

  public isShowingPassword: boolean = false;

  public isShowingConfirmationPassword: boolean = false;

}
