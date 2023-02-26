import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormGroupDirective, ControlContainer } from '@angular/forms';

import { BasicInformationFormComponent } from './basic-information-form.component';

describe('BasicInformationFormComponent', () => {
  let component: BasicInformationFormComponent;
  let fixture: ComponentFixture<BasicInformationFormComponent>;

  beforeEach(async () => {
    const parentForm: FormGroup = new FormGroup({
      basicInformation: new FormGroup({}),
    });

    const formGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = parentForm;

    await TestBed.configureTestingModule({
      declarations: [ BasicInformationFormComponent ],
      providers: [
        { provide: ControlContainer, useValue: formGroupDirective },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
