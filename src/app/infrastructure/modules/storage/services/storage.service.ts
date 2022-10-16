import { StorageServiceInterface } from './../models/storage-service.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
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