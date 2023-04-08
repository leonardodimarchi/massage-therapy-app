import { BackButtonService } from "./back-button.service";

describe('BackButtonService', () => {
  let service: BackButtonService;

  beforeEach(() => {
    service = new BackButtonService();
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
