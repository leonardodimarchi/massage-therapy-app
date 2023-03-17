import { FormGroup, FormGroupDirective, ControlContainer } from '@angular/forms';
import { AddressInformationFormComponent } from './address-information-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('AddressInformationFormComponent', () => {
  let component: AddressInformationFormComponent;
  let fixture: ComponentFixture<AddressInformationFormComponent>;

  beforeEach(async () => {
    const parentForm: FormGroup = new FormGroup({
      basicInformation: new FormGroup({}),
    });

    const formGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = parentForm;

    await TestBed.configureTestingModule({
      declarations: [ AddressInformationFormComponent ],
      providers: [
        { provide: ControlContainer, useValue: formGroupDirective },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
