import { StorageServiceInterface } from '@domain/contracts/services/storage_service.interface';

export class StorageService implements StorageServiceInterface {

  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async get<ReturnType = any>(key: string): Promise<ReturnType | null> {
    const item = localStorage.getItem(key);

    if (item)
      return JSON.parse(item);

    return null;
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async clearAll(): Promise<void> {
    localStorage.clear();
  }

}
