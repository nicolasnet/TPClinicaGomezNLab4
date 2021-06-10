import { TestBed } from '@angular/core/testing';

import { EncuestaFirebaseService } from './encuesta-firebase.service';

describe('EncuestaFirebaseService', () => {
  let service: EncuestaFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncuestaFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
