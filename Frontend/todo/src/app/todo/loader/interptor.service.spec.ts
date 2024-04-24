import { TestBed } from '@angular/core/testing';

import { InterptorService } from './interptor.service';

describe('InterptorService', () => {
  let service: InterptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
