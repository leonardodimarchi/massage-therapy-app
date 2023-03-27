import { AddressByPostalCodeDto } from '@infra/models/address/dto/address_by_postal_code_dto';
import { AddressEntity, AddressEntityProps } from "@domain/entities/address/address_entity";

const postalCode = 'postalCode';
const state = 'state';
const city = 'city';
const neighborhood = 'neighborhood';
const street = 'street';

export const mockedAddressEntity = new AddressEntity({
  postalCode,
  state,
  city,
  neighborhood,
  street,
});

export const mockedAddressEntityProps: AddressEntityProps = {
  postalCode,
  state,
  city,
  neighborhood,
  street,
};

export const mockedAddressByPostalCodeDto: AddressByPostalCodeDto = {
  cep: postalCode,
  city,
  state,
  street,
  neighborhood,
}
