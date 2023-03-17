import { PersonalInformationFormComponent } from './personal-information-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormGroupDirective, ControlContainer } from '@angular/forms';

describe('PersonalInformationFormComponent', () => {
  let component: PersonalInformationFormComponent;
  let fixture: ComponentFixture<PersonalInformationFormComponent>;

  beforeEach(async () => {
    const parentForm: FormGroup = new FormGroup({
      basicInformation: new FormGroup({}),
    });

    const formGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = parentForm;

    await TestBed.configureTestingModule({
      declarations: [ PersonalInformationFormComponent ],
      providers: [
        { provide: ControlContainer, useValue: formGroupDirective },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
