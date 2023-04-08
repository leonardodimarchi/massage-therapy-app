interface Action {
  key: string;
  action: () => void;
};

export class BackButtonService {

  private actions: Action[] = [];

  addAction(action: Action): void {
    this.actions.push(action);
  }

  removeAction(key: string): void {
    this.actions = this.actions.filter(a => a.key !== key);
  }

}
