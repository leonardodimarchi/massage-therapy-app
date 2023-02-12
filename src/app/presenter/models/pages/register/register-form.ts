import { AddressForm } from './address-form';
import { BasicInformationForm } from './basic-information-form';
import { PersonalInformationForm } from './personal-information-form';

export interface RegisterForm {
  basicInformation: BasicInformationForm;
  personalInformation: PersonalInformationForm;
  address: AddressForm;
}
