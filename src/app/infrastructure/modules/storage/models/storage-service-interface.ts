export abstract class StorageServiceInterface {
  abstract set(key: string, value: any): Promise<void>;
  abstract get<ReturnType>(key: string): Promise<ReturnType | null>;
}
