export class BadRequestError extends Error {
  constructor(message?: string) {
    super(message ?? 'Desculpe, algo deu errado! Tente novamente mais tarde.');
  }
}
