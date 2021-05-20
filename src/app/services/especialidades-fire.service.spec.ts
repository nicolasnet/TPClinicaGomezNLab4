import { TestBed } from '@angular/core/testing';

import { EspecialidadesFireService } from './especialidades-fire.service';

describe('EspecialidadesFireService', () => {
  let service: EspecialidadesFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecialidadesFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
