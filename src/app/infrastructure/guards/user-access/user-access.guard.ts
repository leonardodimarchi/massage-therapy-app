import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UserServiceInterface } from "@domain/contracts/services";
import { RouterServiceInterface } from "@infra/modules/router/contracts/router-service.interface";

@Injectable({
  providedIn: 'root',
})
export class UserAccessGuard implements CanActivate {

  constructor(
    private readonly userService: UserServiceInterface,
    private readonly routerService: RouterServiceInterface,
  ) {}

  public async canActivate(route: ActivatedRouteSnapshot, _: RouterStateSnapshot) {
    const { isUnprotectedRoute, isProtectedRoute, redirectTo } = route.data || {};

    if (!redirectTo)
      return true;

    const isLogged = await this.userService.isLogged();
    const hasProtectedAccess = isLogged && isProtectedRoute;
    const hasUnprotectedAccess = !isLogged && isUnprotectedRoute;

    const shouldActivate = hasProtectedAccess || hasUnprotectedAccess;

    if (shouldActivate)
      return true;

    await this.routerService.navigate(redirectTo);
    return false;
  }


}
