import { ControlContainer } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { GetAddressByPostalCodeUsecase } from '@domain/usecases/address/get_address_by_postal_code_usecase';
import { NestedFormGroup } from '@presenter/components/shared/nested-form-group';
import { AddressForm } from '@presenter/models/pages/register/address-form';

@Component({
  selector: '[formGroup] app-address-information-form',
  templateUrl: './address-information-form.component.html',
  styleUrls: ['./address-information-form.component.scss'],
})
export class AddressInformationFormComponent extends NestedFormGroup<AddressForm> {

  constructor(
    protected override readonly controlContainer: ControlContainer,
    private readonly getAddressByPostalCodeUsecase: GetAddressByPostalCodeUsecase,
  ) {
    super(controlContainer);
  }

  @Input()
  public isLoading: boolean = false;

  public async fillAddressByPostalCode(): Promise<void> {
    // TODO: Add loading, validate postalcode and error handling
    const postalCode = this.form.value.postalCode;

    if (!postalCode)
      return;

    const result = await this.getAddressByPostalCodeUsecase.call({ postalCode });

    this.form.patchValue({
      postalCode,
      city: result.city,
      neighborhood: result.neighborhood,
      state: result.state,
      street: result.street,
    });
  }

}
