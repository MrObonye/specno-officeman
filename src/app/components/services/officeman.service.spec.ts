import { TestBed } from '@angular/core/testing';

import { OfficemanService } from './officeman.service';

describe('OfficemanService', () => {
  let service: OfficemanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficemanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
