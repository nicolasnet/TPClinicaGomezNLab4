import { TestBed } from '@angular/core/testing';

import { FileFirestoreService } from './file-firestore.service';

describe('FileFirestoreService', () => {
  let service: FileFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
