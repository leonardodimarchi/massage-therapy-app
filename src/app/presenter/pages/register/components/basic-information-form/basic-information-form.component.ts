import { EventEmitter, Input } from '@angular/core';
import { Component, Output } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-basic-information-form',
  templateUrl: './basic-information-form.component.html',
  styleUrls: ['./basic-information-form.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class BasicInformationFormComponent {
  @Input()
  public formGroupName: string = '';

  public isShowingPassword: boolean = false;

  public isShowingConfirmationPassword: boolean = false;
}
