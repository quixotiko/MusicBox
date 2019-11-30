import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsheetComponent } from './songsheet.component';

describe('SongsheetComponent', () => {
  let component: SongsheetComponent;
  let fixture: ComponentFixture<SongsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
