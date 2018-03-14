import { TestBed, inject } from '@angular/core/testing';

import { PinboardService } from './pinboard.service';

describe('PinboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PinboardService]
    });
  });

  it('should be created', inject([PinboardService], (service: PinboardService) => {
    expect(service).toBeTruthy();
  }));
});
