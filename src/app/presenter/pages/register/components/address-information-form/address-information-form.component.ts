import { Component } from '@angular/core';
import { NestedFormGroup } from '@presenter/components/shared/nested-form-group';
import { AddressForm } from '@presenter/models/pages/register/address-form';

@Component({
  selector: 'app-address-information-form',
  templateUrl: './address-information-form.component.html',
  styleUrls: ['./address-information-form.component.scss'],
})
export class AddressInformationFormComponent extends NestedFormGroup<AddressForm> {}
