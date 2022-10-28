import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterServiceInterface } from '@infra/modules/router/contracts/router-service.interface';

@Injectable()
export class RouterService implements RouterServiceInterface {

  constructor(
    private readonly router: Router,
  ) {}

  async navigate(path: string): Promise<void> {
    await this.router.navigateByUrl(path);
  }
}
