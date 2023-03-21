import { ToastConfig } from "./toast-config.interface";

export abstract class ToastServiceInterface {
    abstract showError(config: ToastConfig): void;
    abstract showWarning(config: ToastConfig): void;
    abstract showSuccess(config: ToastConfig): void;
}
