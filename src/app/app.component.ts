import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SongsheetService } from './services/songsheet.service';
import { Song } from './services/common.types';
import { Store, select } from '@ngrx/store';
import { PlayerState, playerReducer } from './store/reducers/player.reducer';
import { setSongList } from './store/actions/player.action';
import { getSongList } from './store/selectors/player.selector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  @ViewChild('content', {static: true}) content: ElementRef;

  title = 'MusicBox';
  hasScroll = false;
  currentClasses = {
    'stretch': true,
    'shrink': false
  };

  songList: Song[];

  constructor(private songsheetservice: SongsheetService, private store$: Store<any>) { }

  ngOnInit() {
    window.addEventListener("wheel", (e: WheelEvent) => {
      if (e.deltaY > 0 && !this.hasScroll) {
        this.hasScroll = true;
        this.currentClasses = {
          'stretch': false,
          'shrink': true
        }
      }
      else if (e.deltaY < 0 && this.hasScroll && window.scrollY === 0) {
        this.hasScroll = false;
        this.currentClasses = {
          'stretch': true,
          'shrink': false
        }
      }
    })
    this.store$.pipe(select('player'),select(getSongList)).subscribe((songList) => {
      // console.log(songList);
    });
    this.getDefaultPlaylist();
  }

  getDefaultPlaylist() {
    this.songsheetservice.getPlayListDetail(1997190595).subscribe((songList: Song[]) => {
      console.log(songList);
      this.store$.dispatch(setSongList({songList}));
    })
  }
}
