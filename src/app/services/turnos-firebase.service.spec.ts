import { TestBed } from '@angular/core/testing';

import { TurnosFirebaseService } from './turnos-firebase.service';

describe('TurnosFirebaseService', () => {
  let service: TurnosFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnosFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
