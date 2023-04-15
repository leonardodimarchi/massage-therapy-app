import { Injectable } from "@angular/core";
import { App } from "@capacitor/app";

interface Action {
  key: string;
  action: () => void;
};

@Injectable({
  providedIn: 'root',
})
export class BackButtonService {

  private actions: Action[] = [];

  initialize(): void {
    App.addListener('backButton', ({canGoBack}) => {
      if(!canGoBack) {
        App.exitApp();

      } else if (this.actions.length) {
        const lastAction = this.actions.pop();

        lastAction?.action();
      } else {
        window.history.back();
      }
    });
  }

  addAction(action: Action): void {
    this.actions.push(action);
  }

  removeAction(key: string): void {
    this.actions = this.actions.filter(a => a.key !== key);
  }

}
