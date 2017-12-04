import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HirePlumberComponent } from './hire-plumber.component';

describe('HirePlumberComponent', () => {
  let component: HirePlumberComponent;
  let fixture: ComponentFixture<HirePlumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HirePlumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HirePlumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
