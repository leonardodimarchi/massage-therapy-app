import { FormGroup, FormGroupDirective, ControlContainer, Validators, FormControl } from '@angular/forms';
import { AddressInformationFormComponent } from './address-information-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetAddressByPostalCodeUsecase } from '@domain/usecases/address/get_address_by_postal_code_usecase';
import { mockedAddressEntity } from '@mocks/address/address_entity_mock';
import { AddressValidators } from '@domain/validators/address/address_validators';
import { ToastServiceInterface } from '@infra/modules/toast/contracts/toast-service.interface';

describe('AddressInformationFormComponent', () => {
  let component: AddressInformationFormComponent;
  let fixture: ComponentFixture<AddressInformationFormComponent>;

  let getAddressByPostalCodeUsecase: jasmine.SpyObj<GetAddressByPostalCodeUsecase>;
  let toastService: jasmine.SpyObj<ToastServiceInterface>;

  beforeEach(async () => {
    const parentForm: FormGroup = new FormGroup({
      street: new FormControl(),
      city: new FormControl(),
      neighborhood: new FormControl(),
      state: new FormControl(),
      postalCode: new FormControl(),
    });

    const formGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = parentForm;

    toastService = jasmine.createSpyObj('ToastServiceInterface', ['showWarning']);
    getAddressByPostalCodeUsecase = jasmine.createSpyObj('GetAddressByPostalCodeUsecase', ['call']);

    await TestBed.configureTestingModule({
      declarations: [ AddressInformationFormComponent ],
      providers: [
        { provide: ControlContainer, useValue: formGroupDirective },
        { provide: ToastServiceInterface, useValue: toastService },
        { provide: GetAddressByPostalCodeUsecase, useValue: getAddressByPostalCodeUsecase },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressInformationFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Postal Code', () => {
    it('should fill address fields', async () => {
      getAddressByPostalCodeUsecase.call.and.resolveTo(mockedAddressEntity);

      component.form.controls.postalCode.setValue('12345678');
      await component.fillAddressByPostalCode();

      expect(component.form.value.street).toEqual(mockedAddressEntity.street);
      expect(component.form.value.city).toEqual(mockedAddressEntity.city);
      expect(component.form.value.neighborhood).toEqual(mockedAddressEntity.neighborhood);
      expect(component.form.value.state).toEqual(mockedAddressEntity.state);
    });

    it('should not call if has empty postal code', async () => {
      component.form.controls.postalCode.setValue('');
      await component.fillAddressByPostalCode();

      expect(getAddressByPostalCodeUsecase.call).not.toHaveBeenCalled();
    });

    it('should not call if has invalid postal code', async () => {
      spyOn(AddressValidators, 'isValidPostalCode').and.returnValue(false);
      component.form.controls.postalCode.setValue('...');

      await component.fillAddressByPostalCode();

      expect(getAddressByPostalCodeUsecase.call).not.toHaveBeenCalled();
    });

    it('should show an alert if something goes wrong', async () => {
      getAddressByPostalCodeUsecase.call.and.throwError(new Error('Mocked error'));

      component.form.controls.postalCode.setValue('12345678');
      await component.fillAddressByPostalCode();

      expect(toastService.showWarning).toHaveBeenCalledTimes(1);
    });
  });
});
