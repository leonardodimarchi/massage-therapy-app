import { UserServiceInterface } from 'src/app/domain/contracts/services/user_service.interface';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { RouterServiceInterface } from '../../modules/router/contracts/router-service.interface';
import { Injectable } from '@angular/core';

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

    console.log(route.data)

    if (!redirectTo)
      return true;

    const isLogged = await this.userService.isLogged();
    const hasProtectedAccess = isLogged && isProtectedRoute;
    const hasUnprotectedAccess = !isLogged && isUnprotectedRoute;

    const shouldActivate = hasProtectedAccess || hasUnprotectedAccess;

    console.log(isLogged)

    if (shouldActivate)
      return true;

    await this.routerService.navigate(redirectTo);
    return false;
  }


}
