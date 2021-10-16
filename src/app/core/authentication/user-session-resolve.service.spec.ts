import { TestBed } from '@angular/core/testing';

import { UserSessionResolveService } from './user-session-resolve.service';

describe('UserSessionResolveService', () => {
  let service: UserSessionResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSessionResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
