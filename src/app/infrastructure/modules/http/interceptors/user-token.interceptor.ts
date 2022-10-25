import { UserServiceInterface } from 'src/app/domain/contracts/services/user_service.interface';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { concatAll, from, map, Observable } from "rxjs";

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


