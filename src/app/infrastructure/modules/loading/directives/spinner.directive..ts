import { ComponentRef, Directive, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewContainerRef } from "@angular/core";
import { SpinnerComponent } from "../components/spinner/spinner.component";

@Directive({ selector: '[loadingSpinner]' })
export class SpinnerDirective implements OnInit {

    constructor(
        private directiveView: ViewContainerRef,
        private renderer: Renderer2,
        private directiveElement: ElementRef,
    ) { }

    @Input('loadingSpinnerMessage')
    spinnerMessage?: string;

    @Input('loadingSpinnerStatus')
    spinnerStatus: 'basic' | 'danger' | 'error' = 'basic';

    @Input('loadingSpinnerSize')
    size: 'small' | 'large' | 'medium' = 'medium';

    @Input('loadingSpinnerPosition')
    position: 'center' | 'left' | 'right' = 'center';

    @Input('loadingSpinnerBackdrop')
    hasBackdrop: boolean = true;

    @Input('loadingSpinner')
    set nbSpinner(val: boolean) {
        if (this.finishedFirstLoad) {
            if (val) {
                this.show();
            } else {
                this.hide();
            }
        } else {
            this.shouldShow = val;
        }
    }

    @HostBinding('class.spinner-container')
    private isSpinnerExist = false;

    private shouldShow = false;
    private spinner?: ComponentRef<SpinnerComponent>;
    private finishedFirstLoad: boolean = false;

    ngOnInit() {
        if (this.shouldShow) {
            this.show();
        }

        this.finishedFirstLoad = true;
    }

    hide() {
        if (this.isSpinnerExist) {
            this.directiveView.remove();
            this.isSpinnerExist = false;
        }
    }

    show() {
        if (!this.isSpinnerExist) {
            this.spinner = this.directiveView.createComponent<SpinnerComponent>(SpinnerComponent);
            this.setInstanceInputs(this.spinner.instance);
            this.spinner.changeDetectorRef.detectChanges();
            this.renderer.appendChild(this.directiveElement.nativeElement, this.spinner.location.nativeElement);
            this.isSpinnerExist = true;
        }
    }

    setInstanceInputs(instance: SpinnerComponent) {
        instance.message = this.spinnerMessage
        typeof this.spinnerStatus !== 'undefined' && (instance.status = this.spinnerStatus);
        typeof this.size !== 'undefined' && (instance.size = this.size);
        typeof this.position !== 'undefined' && (instance.position = this.position);
        typeof this.hasBackdrop !== 'undefined' && (instance.hasBackdrop = this.hasBackdrop);
    }
}
