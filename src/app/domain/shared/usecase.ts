export abstract class UseCase<Input, Output> {
  abstract call(params: Input): Promise<Output>;
}
