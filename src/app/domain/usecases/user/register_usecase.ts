import { UserRepositoryInterface } from "@domain/contracts/repositories";
import { UserEntity } from "@domain/entities/user/user_entity";
import { UserGenderEnum } from "@domain/models/user/user_gender.enum";
import { UseCase } from "../usecase";

export interface RegisterUseCaseInput {
    email: string;
    name: string;
    phone: string;
    birthDate: Date;
    password: string;
    gender: UserGenderEnum;
    diseaseHistory?: string;

    state: string;
    city: string;
    postalCode: string;
    neighborhood: string;
    houseNumber: number;
}

export interface RegisterUseCaseOutput {
    createdUser: UserEntity,
}

export class RegisterUsecase implements UseCase<RegisterUseCaseInput, RegisterUseCaseOutput> {

    constructor(
        private readonly repository: UserRepositoryInterface,
    ) { }

    public async call({
        email,
        name,
        phone,
        birthDate,
        password,
        gender,
        diseaseHistory,
        state,
        city,
        postalCode,
        neighborhood,
        houseNumber,
    }: RegisterUseCaseInput): Promise<RegisterUseCaseOutput> {
      throw new Error('Method not implemented.')
    }
}