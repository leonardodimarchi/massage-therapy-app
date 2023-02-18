import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PillSelectComponent } from './pill-select.component';

describe('PillSelectComponent', () => {
  let component: PillSelectComponent;
  let fixture: ComponentFixture<PillSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PillSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PillSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
