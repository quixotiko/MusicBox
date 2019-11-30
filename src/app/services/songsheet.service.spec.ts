import { TestBed } from '@angular/core/testing';

import { SongsheetService } from './songsheet.service';

describe('SongsheetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongsheetService = TestBed.get(SongsheetService);
    expect(service).toBeTruthy();
  });
});
