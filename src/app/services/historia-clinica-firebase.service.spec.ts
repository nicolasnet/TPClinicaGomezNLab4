import { TestBed } from '@angular/core/testing';

import { HistoriaClinicaFirebaseService } from './historia-clinica-firebase.service';

describe('HistoriaClinicaFirebaseService', () => {
  let service: HistoriaClinicaFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriaClinicaFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
