import { TestBed } from '@angular/core/testing';

import { StorageService } from '@infra/modules/storage/services/storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let localStorageSpy: jasmine.SpyObj<typeof localStorage>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);

    localStorageSpy = jasmine.createSpyObj('localStorage', ['setItem', 'getItem']);

    Object.defineProperty(window, 'localStorage', {
      value: localStorageSpy
     });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Set', () => {
    it('should set the value at the correct key', async () => {
      const key = 'mocked_key';
      const value = {
        property: 'mocked',
      }

      await service.set(key, value);

      expect(localStorageSpy.setItem).toHaveBeenCalledOnceWith(key, JSON.stringify(value));
    });
  });

  describe('Get', () => {
    it('should get the value if has one', async () => {
      const key = 'mocked_key';
      const value = {
        property: 'mocked',
      }

      localStorageSpy.getItem.and.returnValue(JSON.stringify(value));

      const result = await service.get(key);

      expect(result).toEqual(value);
      expect(localStorageSpy.getItem).toHaveBeenCalledOnceWith(key);
    });
  })
});
