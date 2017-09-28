import { TestBed, inject } from '@angular/core/testing';

import { PrimaryInfoService } from './primary-info.service';

describe('PrimaryInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrimaryInfoService]
    });
  });

  it('should be created', inject([PrimaryInfoService], (service: PrimaryInfoService) => {
    expect(service).toBeTruthy();
  }));
});
