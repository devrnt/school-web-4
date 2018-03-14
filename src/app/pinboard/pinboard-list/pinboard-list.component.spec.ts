import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinboardListComponent } from './pinboard-list.component';

describe('PinboardListComponent', () => {
  let component: PinboardListComponent;
  let fixture: ComponentFixture<PinboardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinboardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
