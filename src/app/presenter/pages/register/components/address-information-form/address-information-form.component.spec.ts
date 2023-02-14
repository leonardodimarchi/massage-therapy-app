import { AddressInformationFormComponent } from './address-information-form.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('AddressInformationFormComponent', () => {
  let component: AddressInformationFormComponent;
  let fixture: ComponentFixture<AddressInformationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressInformationFormComponent ]
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
