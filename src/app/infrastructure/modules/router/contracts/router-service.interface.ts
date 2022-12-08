export abstract class RouterServiceInterface {
  abstract navigate(path: string): Promise<void>;
  abstract goBack(): Promise<void>;
}
