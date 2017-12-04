import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPlumberComponent } from './register-plumber.component';

describe('RegisterPlumberComponent', () => {
  let component: RegisterPlumberComponent;
  let fixture: ComponentFixture<RegisterPlumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPlumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPlumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
