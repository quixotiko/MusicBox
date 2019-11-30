import { TestBed } from '@angular/core/testing';

import { SongsheetResolverService } from './songsheet-resolver.service';

describe('SongsheetResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongsheetResolverService = TestBed.get(SongsheetResolverService);
    expect(service).toBeTruthy();
  });
});
