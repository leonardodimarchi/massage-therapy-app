import { ToastConfig } from "./toast-config.interface";

export abstract class ToastServiceInterface {
    abstract showError(config: ToastConfig): void;
}