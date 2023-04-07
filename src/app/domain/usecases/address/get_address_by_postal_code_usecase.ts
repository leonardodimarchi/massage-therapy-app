import { AddressEntity } from './../../entities/address/address_entity';
import { AddressRepositoryInterface } from "@domain/contracts/repositories";
import { UseCase } from "../usecase";
import { ValidationError } from '@domain/errors/validation_error';
import { AddressValidators } from '@domain/validators/address/address_validators';

export type GetAddressByPostalCodeUsecaseInput = {
  postalCode: string;
};

export type GetAddressByPostalCodeUsecaseOutput = AddressEntity;

export class GetAddressByPostalCodeUsecase implements UseCase<GetAddressByPostalCodeUsecaseInput, GetAddressByPostalCodeUsecaseOutput> {

  constructor(
    private readonly repository: AddressRepositoryInterface,
  ) {}

  async call({ postalCode }: GetAddressByPostalCodeUsecaseInput): Promise<GetAddressByPostalCodeUsecaseOutput> {
    const isValidPostalCode = AddressValidators.isValidPostalCode(postalCode);

    if (!isValidPostalCode)
      throw new ValidationError('CEP inválido.');

    return await this.repository.getAddressByPostalCode(postalCode);
  }
}
