import { HttpClient } from "@angular/common/http";
import { EventEmitter } from "@angular/core";
import { fakeAsync, tick } from "@angular/core/testing";
import { HttpService } from "./http_service";

describe('HttpService', () => {
    let httpClient: jasmine.SpyObj<HttpClient>;
    let service: HttpService;
    let emitter: EventEmitter<any>;

    beforeEach(() => {
        httpClient = jasmine.createSpyObj('HttpClient', ['post']);
        service = new HttpService(httpClient);

        emitter = new EventEmitter();
        httpClient.post.and.returnValue(emitter);
    });

    describe('Post', () => {
        it('should call the client post method', fakeAsync(() => {
            const url = 'mocked_url';
            const mockedPaylod = {};

            service.post(url, mockedPaylod);

            emitter.next({});
            emitter.complete();

            tick();

            expect(httpClient.post).toHaveBeenCalledOnceWith(url, mockedPaylod);
        }));
    });
});