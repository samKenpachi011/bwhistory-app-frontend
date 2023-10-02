import { TestBed } from '@angular/core/testing';

import { AppApiService } from './app-api-service.service';

describe('AppApiServiceService', () => {
  let service: AppApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
