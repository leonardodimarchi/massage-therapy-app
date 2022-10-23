export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message ?? 'Sem autorização para realizar a ação =/');
  }
}
