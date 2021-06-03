import { TestBed } from '@angular/core/testing';

import { DiasLaborablesService } from './dias-laborables.service';

describe('DiasLaborablesService', () => {
  let service: DiasLaborablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiasLaborablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
