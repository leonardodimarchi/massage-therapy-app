import { AddressEntity, AddressEntityProps } from "@domain/entities/address/address_entity";

const postalCode = 'postalCode';
const state = 'state';
const city = 'city';
const neighborhood = 'neighborhood';
const street = 'street';
const houseNumber = 1;

export const mockedAddressEntity = new AddressEntity({
  postalCode,
  state,
  city,
  neighborhood,
  street,
  houseNumber,
});

export const mockedAddressEntityProps: AddressEntityProps = {
  postalCode,
  state,
  city,
  neighborhood,
  street,
  houseNumber,
};
