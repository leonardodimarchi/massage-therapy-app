export abstract class StorageServiceInterface {
  abstract set(key: string, value: any): Promise<void>;
  abstract get<ReturnType>(key: string): Promise<ReturnType | null>;
  abstract remove(key: string): Promise<void>;
  abstract clearAll(): Promise<void>;
}
