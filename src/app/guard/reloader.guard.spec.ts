import { TestBed } from '@angular/core/testing';

import { ReloaderGuard } from './reloader.guard';

describe('ReloaderGuard', () => {
  let guard: ReloaderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReloaderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
