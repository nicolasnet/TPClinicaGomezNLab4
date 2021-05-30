import { TestBed } from '@angular/core/testing';

import { MisHorariosFirebaseService } from './mis-horarios-firebase.service';

describe('MisHorariosFirebaseService', () => {
  let service: MisHorariosFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisHorariosFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
