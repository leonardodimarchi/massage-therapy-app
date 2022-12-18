import { ComponentRef, Directive, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewContainerRef } from "@angular/core";
import { SpinnerComponent } from "../components/spinner/spinner.component";

@Directive({ selector: '[loadingSpinner]' })
export class SpinnerDirective implements OnInit {

  constructor(
    private containerRef: ViewContainerRef,
    private renderer: Renderer2,
    private directive: ElementRef,
  ) { }

  @Input('loadingSpinnerMessage')
  public spinnerMessage?: string;

  @Input('loadingSpinnerStatus')
  public spinnerStatus: 'basic' | 'danger' | 'error' | 'accent' = 'basic';

  @Input('loadingSpinnerSize')
  public size: 'small' | 'large' | 'medium' | 'huge' = 'medium';

  @Input('loadingSpinnerPosition')
  public position: 'center' | 'left' | 'right' = 'center';

  @Input('loadingSpinnerBackdrop')
  public hasBackdrop: boolean = true;

  @Input('loadingSpinner')
  set loadingSpinner(isLoading: boolean) {
    if (this.finishedFirstLoad) {
      if (isLoading)
        this.show();
      else
        this.hide();
    } else
      this.shouldShowOnInit = isLoading;
  }

  @HostBinding('class.spinner-container')
  private exists = false;

  private spinner?: ComponentRef<SpinnerComponent>;

  private shouldShowOnInit: boolean = false;
  private finishedFirstLoad: boolean = false;

  public ngOnInit(): void {
    if (this.shouldShowOnInit)
      this.show();

    this.finishedFirstLoad = true;
  }

  public hide(): void {
    if (this.exists) {
      this.containerRef.remove();
      this.exists = false;
    }
  }

  public show(): void {
    if (!this.exists) {
      this.createSpinner();
      this.exists = true;
    }
  }

  private createSpinner(): void {
    this.spinner = this.containerRef.createComponent<SpinnerComponent>(SpinnerComponent);
    this.setSpinnerInputs(this.spinner.instance);

    this.spinner.changeDetectorRef.detectChanges();
    this.renderer.appendChild(this.directive.nativeElement, this.spinner.location.nativeElement);
  }

  private setSpinnerInputs(spinner: SpinnerComponent): void {
    if (this.spinnerMessage)
      spinner.message = this.spinnerMessage

    if (this.spinnerStatus)
      spinner.status = this.spinnerStatus;

    if (this.size)
      spinner.size = this.size;

    if (this.position)
      spinner.position = this.position;

    if (this.hasBackdrop !== null && this.hasBackdrop !== undefined)
      spinner.hasBackdrop = this.hasBackdrop;

    const hasNoChildren = !this.directive.nativeElement?.hasChildNodes();

    spinner.isBlockSpinner = hasNoChildren;
  }
}
