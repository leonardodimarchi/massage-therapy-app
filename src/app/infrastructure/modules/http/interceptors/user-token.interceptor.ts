import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { UserServiceInterface } from "@domain/contracts/services";
import { Observable, from, map, concatAll } from "rxjs";

export class UserTokenInterceptor implements HttpInterceptor {

  public static DISABLE: string = 'Disable-UserToken-Interceptor';
  storage: any;

  constructor(
    private readonly userService: UserServiceInterface,
  ) {}

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isDisabled = req.headers.get(UserTokenInterceptor.DISABLE);

    if (isDisabled) {
      const cleanReq = req.clone({
        headers: req.headers.delete(UserTokenInterceptor.DISABLE)
      });

      return next.handle(cleanReq);
    }

    return from(this.userService.getJwt())
      .pipe(
        map(result => {
          if (!result || !result.accessToken)
            return next.handle(req);

          const authHeaders = req.headers.set('Authorization', result.accessToken);

          return next.handle(req.clone({ headers: authHeaders }));
        }),
        concatAll(),
      );
  }
}


