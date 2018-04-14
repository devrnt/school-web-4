import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinboardMapsComponent } from './pinboard-maps.component';

describe('PinboardMapsComponent', () => {
  let component: PinboardMapsComponent;
  let fixture: ComponentFixture<PinboardMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinboardMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinboardMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
