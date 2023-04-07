import { ControlContainer } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { GetAddressByPostalCodeUsecase } from '@domain/usecases/address/get_address_by_postal_code_usecase';
import { NestedFormGroup } from '@presenter/components/shared/nested-form-group';
import { AddressForm } from '@presenter/models/pages/register/address-form';
import { AddressValidators } from '@domain/validators/address/address_validators';
import { ToastServiceInterface } from '@infra/modules/toast/contracts/toast-service.interface';

@Component({
  selector: '[formGroup] app-address-information-form',
  templateUrl: './address-information-form.component.html',
  styleUrls: ['./address-information-form.component.scss'],
})
export class AddressInformationFormComponent extends NestedFormGroup<AddressForm> {

  constructor(
    protected override readonly controlContainer: ControlContainer,
    private readonly toastService: ToastServiceInterface,
    private readonly getAddressByPostalCodeUsecase: GetAddressByPostalCodeUsecase,
  ) {
    super(controlContainer);
  }

  @Input()
  public isLoading: boolean = false;

  public isLoadingPostalCodeSearch: boolean = false;

  public async fillAddressByPostalCode(): Promise<void> {
    if (this.isLoadingPostalCodeSearch)
      return;

    const postalCode = this.form.value.postalCode;

    if (!postalCode)
      return;

    if (!AddressValidators.isValidPostalCode(postalCode))
      return;

    this.isLoadingPostalCodeSearch = true;

    try {
      const result = await this.getAddressByPostalCodeUsecase.call({ postalCode });

      this.form.patchValue({
        postalCode,
        city: result.city,
        neighborhood: result.neighborhood,
        state: result.state,
        street: result.street,
      });
    } catch (error: unknown) {
      if (error instanceof Error)
        this.toastService.showWarning({ message: 'CEP não encontrado =/' });
    } finally {
      this.isLoadingPostalCodeSearch = false
    }
  }

}
