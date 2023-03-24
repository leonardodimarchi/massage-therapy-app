import { PostalCodeRepositoryInterface } from "@domain/contracts/repositories";
import { UseCase } from "../usecase";

export type GetAddressByCepUsecaseInput = {
  postalCode: string;
};

export type GetAddressByCepUsecaseOutput = void;

export class GetAddressByCepUsecase implements UseCase<GetAddressByCepUsecaseInput, GetAddressByCepUsecaseOutput> {

  constructor(
    private readonly repository: PostalCodeRepositoryInterface,
  ) {}

  async call(params: GetAddressByCepUsecaseInput): Promise<GetAddressByCepUsecaseOutput> {
    throw new Error("Method not implemented.");
  }
}
