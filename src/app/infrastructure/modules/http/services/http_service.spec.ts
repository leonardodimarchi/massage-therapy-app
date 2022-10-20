import { HttpConfig } from '../contracts/http_config.interface';
import { HttpClient } from "@angular/common/http";
import { EventEmitter } from "@angular/core";
import { fakeAsync, tick } from "@angular/core/testing";
import { HttpService } from "./http_service";

describe('HttpService', () => {
    let httpClient: jasmine.SpyObj<HttpClient>;
    let service: HttpService;
    let emitter: EventEmitter<any>;

    const httpConfig: HttpConfig = {
      baseUrl: 'http://mocked.api',
    }

    beforeEach(() => {
        httpClient = jasmine.createSpyObj('HttpClient', ['post']);
        service = new HttpService(httpClient, httpConfig);

        emitter = new EventEmitter();
        httpClient.post.and.returnValue(emitter);
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
