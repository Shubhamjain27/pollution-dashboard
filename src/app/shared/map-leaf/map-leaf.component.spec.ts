import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLeafComponent } from './map-leaf.component';

describe('MapLeafComponent', () => {
  let component: MapLeafComponent;
  let fixture: ComponentFixture<MapLeafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapLeafComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLeafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
