import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterServiceInterface } from '@infra/modules/router/contracts/router-service.interface';

@Injectable()
export class RouterService implements RouterServiceInterface {

  constructor(
    private readonly router: Router,
    private readonly location: Location,
  ) {}

  async navigate(path: string): Promise<void> {
    await this.router.navigateByUrl(path);
  }

  async goBack(): Promise<void> {
    this.location.back();
  }
}
