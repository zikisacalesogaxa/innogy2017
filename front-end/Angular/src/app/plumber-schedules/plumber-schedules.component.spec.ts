import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlumberSchedulesComponent } from './plumber-schedules.component';

describe('PlumberSchedulesComponent', () => {
  let component: PlumberSchedulesComponent;
  let fixture: ComponentFixture<PlumberSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlumberSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlumberSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
