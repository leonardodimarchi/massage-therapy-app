import { AddressEntity } from "./address_entity";

describe('AddressEntity', () => {
  it('should create with correct properties', () => {
    const postalCode = 'postalCode';
    const state = 'state';
    const city = 'city';
    const neighborhood = 'neighborhood';
    const street = 'street';

    const address = new AddressEntity({
      postalCode,
      state,
      city,
      neighborhood,
      street,
    });

    expect(address.postalCode).toBe(postalCode);
    expect(address.state).toBe(state);
    expect(address.city).toBe(city);
    expect(address.neighborhood).toBe(neighborhood);
    expect(address.street).toBe(street);
  });
});
