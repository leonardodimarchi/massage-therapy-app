import { StorageServiceInterface } from '@domain/contracts/services/storage_service.interface';

export class StorageService implements StorageServiceInterface {

  public async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public async get<ReturnType = any>(key: string): Promise<ReturnType | null> {
    const item = localStorage.getItem(key);

    if (item)
      return JSON.parse(item);

    return null;
  }
}
