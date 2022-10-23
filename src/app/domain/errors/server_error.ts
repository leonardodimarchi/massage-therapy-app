export class ServerError extends Error {
  constructor(message?: string) {
    super(message ?? 'Ocorreu algum erro inesperado! Por favor, Tente novamente mais tarde.');
  }
}
