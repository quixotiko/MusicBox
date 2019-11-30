import { Injectable } from '@angular/core';
import { SongsheetService } from './songsheet.service';
import { Router, Resolve, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayLists } from './common.types';

@Injectable({
  providedIn: 'root'
})
export class SongsheetResolverService implements Resolve<PlayLists>{

  constructor(private songsheetservice: SongsheetService) { }

  resolve(): Observable<PlayLists> {
    return this.songsheetservice.getPlayLists();
  }

}
