import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinboardDetailComponent } from './pinboard-detail.component';

describe('PinboardDetailComponent', () => {
  let component: PinboardDetailComponent;
  let fixture: ComponentFixture<PinboardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinboardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinboardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
