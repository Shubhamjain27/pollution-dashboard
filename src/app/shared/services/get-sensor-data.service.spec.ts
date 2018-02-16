import { TestBed, inject } from '@angular/core/testing';

import { GetSensorDataService } from './get-sensor-data.service';

describe('GetSensorDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetSensorDataService]
    });
  });

  it('should be created', inject([GetSensorDataService], (service: GetSensorDataService) => {
    expect(service).toBeTruthy();
  }));
});
