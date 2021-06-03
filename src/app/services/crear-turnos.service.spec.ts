import { TestBed } from '@angular/core/testing';

import { CrearTurnosService } from './crear-turnos.service';

describe('CrearTurnosService', () => {
  let service: CrearTurnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearTurnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
