import { NavigationEnd, Router } from "@angular/router";
import { BackButtonService } from "./back-button.service";
import { Subject } from "rxjs";
import { Event } from "@angular/router";
import { NavigationStart } from "@angular/router";

describe('BackButtonService', () => {
  let service: BackButtonService;

  let routerSpy: jasmine.SpyObj<Router>;
  let routerEvents: Subject<Event>;

  beforeEach(() => {
    routerEvents = new Subject<Event>();
    routerSpy = jasmine.createSpyObj('Router', [''], { events: routerEvents });

    service = new BackButtonService(routerSpy);
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

  describe('Routing', () => {
    it('should set the url at the stack when routing', () => {
      routerEvents.next(new NavigationEnd(1, '/my-url', 'my-new-url'));

      expect((service as any).navigationStack.length).toBe(1);
      expect((service as any).navigationStack[0]).toBe('/my-url');
    });
  });
});
