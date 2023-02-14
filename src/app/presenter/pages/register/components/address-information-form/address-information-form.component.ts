import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-address-information-form',
  templateUrl: './address-information-form.component.html',
  styleUrls: ['./address-information-form.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class AddressInformationFormComponent {
  @Input()
  public formGroupName: string = '';
}
