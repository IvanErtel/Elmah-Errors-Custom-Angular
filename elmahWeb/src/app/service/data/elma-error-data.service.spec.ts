import { TestBed } from '@angular/core/testing';

import { ElmaErrorDataService } from './elma-error-data.service';

describe('ElmaErrorDataService', () => {
  let service: ElmaErrorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElmaErrorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
