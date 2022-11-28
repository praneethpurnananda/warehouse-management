import { TestBed } from '@angular/core/testing';

import { ProdutManagementService } from './produt-management.service';

describe('ProdutManagementService', () => {
  let service: ProdutManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
