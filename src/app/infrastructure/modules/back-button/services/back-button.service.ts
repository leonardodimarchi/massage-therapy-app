import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

interface Action {
  key: string;
  action: () => void;
};

@Injectable({
  providedIn: 'root',
})
export class BackButtonService {

  constructor(
    private readonly router: Router,
  ) {}

  private actions: Action[] = [];
  private navigationStack: string[] = [];

  initialize(): void {
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd)
        this.navigationStack.push(event.url);
    });
  }

  addAction(action: Action): void {
    this.actions.push(action);
  }

  removeAction(key: string): void {
    this.actions = this.actions.filter(a => a.key !== key);
  }

}
