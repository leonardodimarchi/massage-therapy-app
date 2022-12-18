import { HttpClient } from "@angular/common/http";
import { EventEmitter } from "@angular/core";
import { fakeAsync, tick } from "@angular/core/testing";
import { HttpConfig } from "@infra/modules/http/contracts/http_config.interface";
import { HttpService } from "@infra/modules/http/services/http_service";

describe('HttpService', () => {
    let httpClient: jasmine.SpyObj<HttpClient>;
    let service: HttpService;
    let emitter: EventEmitter<any>;

    const httpConfig: HttpConfig = {
      baseUrl: 'http://mocked.api',
    }

    beforeEach(() => {
        httpClient = jasmine.createSpyObj('HttpClient', ['post', 'get']);
        service = new HttpService(httpClient, httpConfig);

        emitter = new EventEmitter();
        httpClient.post.and.returnValue(emitter);
        httpClient.get.and.returnValue(emitter);
    });

    describe('Get', () => {
      it('should call the client get method', fakeAsync(() => {
          const url = 'mocked_url';
          const expectedUrl = httpConfig.baseUrl + url;

          service.get(url);

          emitter.next({});
          emitter.complete();

          tick();

          expect(httpClient.get).toHaveBeenCalledOnceWith(expectedUrl);
      }));
  });

    describe('Post', () => {
        it('should call the client post method', fakeAsync(() => {
            const url = 'mocked_url';
            const expectedUrl = httpConfig.baseUrl + url;
            const mockedPayload = {};

            service.post(url, mockedPayload);

            emitter.next({});
            emitter.complete();

            tick();

            expect(httpClient.post).toHaveBeenCalledOnceWith(expectedUrl, mockedPayload);
        }));
    });
});
