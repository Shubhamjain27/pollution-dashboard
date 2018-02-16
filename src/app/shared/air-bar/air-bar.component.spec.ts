import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirBarComponent } from './air-bar.component';

describe('AirBarComponent', () => {
  let component: AirBarComponent;
  let fixture: ComponentFixture<AirBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
