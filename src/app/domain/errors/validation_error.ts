export class ValidationError extends Error {
  constructor(message?: string) {
    super(message ?? 'Algo deu errado, por favor, verifique as informações e tente novamente =/');
  }
}
