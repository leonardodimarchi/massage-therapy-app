import { NavigationEnd, Router } from "@angular/router";
import { BackButtonService } from "./back-button.service";
import { Subject } from "rxjs";
import { Event } from "@angular/router";
import { NavigationStart } from "@angular/router";

describe('BackButtonService', () => {
  let service: BackButtonService;

  beforeEach(() => {
    service = new BackButtonService();
    service.initialize();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Actions', () => {
    it('should add an action', () => {
      service.addAction({
        key: 'key-1',
        action: () => null,
      });

      expect((service as any).actions.length).toBe(1);
    });

    it('should remove an action', () => {
      service.addAction({
        key: 'key-1',
        action: () => null,
      });

      service.addAction({
        key: 'key-2',
        action: () => null,
      });

      service.removeAction('key-1');

      expect((service as any).actions.length).toBe(1);
      expect((service as any).actions[0].key).toBe('key-2');
    });
  });
});
