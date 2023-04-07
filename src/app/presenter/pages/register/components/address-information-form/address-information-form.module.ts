import { NgxMaskModule } from 'ngx-mask';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoadingSpinnerModule } from "@infra/modules/loading/loading.module";
import { AddressInformationFormComponent } from "./address-information-form.component";
import { GetAddressByPostalCodeUsecase } from '@domain/usecases/address/get_address_by_postal_code_usecase';
import { AddressRepositoryInterface } from '@domain/contracts/repositories';
import { AddressDatasourceInterface } from '@infra/contracts/datasources';
import { AddressRepository } from '@infra/repositories/address/address_repository';
import { AddressDatasource } from '@infra/datasources/address/address_datasource';
import { CepProvider } from '@infra/contracts/providers/cep_provider';
import cep from 'cep-promise';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingSpinnerModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [
    AddressInformationFormComponent,
  ],
  exports: [
    AddressInformationFormComponent,
  ],
  providers: [
    {
      provide: GetAddressByPostalCodeUsecase,
      useFactory: (repo: AddressRepositoryInterface) => {
        return new GetAddressByPostalCodeUsecase(repo);
      },
      deps: [AddressRepositoryInterface],
    },
    {
      provide: AddressRepositoryInterface,
      useFactory: (datasource: AddressDatasourceInterface) => {
        return new AddressRepository(datasource);
      },
      deps: [AddressDatasourceInterface],
    },
    {
      provide: AddressDatasourceInterface,
      useFactory: () => {
        const provider: CepProvider = {
          getAddress: (postalCode: string) => cep(postalCode),
        }

        return new AddressDatasource(provider);
      },
    },
  ],
})
export class AddressInformationFormModule { }
