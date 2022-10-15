export interface StorageServiceInterface {
  set(key: string, value: any): Promise<void>;
  get<ReturnType>(key: string): Promise<ReturnType | null>;
}
