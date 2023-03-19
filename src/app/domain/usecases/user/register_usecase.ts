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

    address: {
        state: string;
        city: string;
        postalCode: string;
        neighborhood: string;
        houseNumber: number;
    }
}

export interface RegisterUseCaseOutput {
    createdUser: UserEntity;
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
        address,
    }: RegisterUseCaseInput): Promise<RegisterUseCaseOutput> {
        const createdUser = await this.repository.register({
            email,
            name,
            phone,
            birthDate,
            password,
            gender,
            diseaseHistory,
            address,
        });

        return { createdUser };
    }
}