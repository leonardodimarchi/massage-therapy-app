import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get<ReturnType = any>(key: string): ReturnType | null {
    const item = localStorage.getItem(key);

    if (item)
      return JSON.parse(item);

    return null;
  }
}
