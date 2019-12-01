import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SongsheetService } from './services/songsheet.service';
import { Song } from './services/common.types';
import { Store, select } from '@ngrx/store';
import { setSongList, setPlaying, setCurrentIndex } from './store/actions/player.action';
import { getSongList, getSongListName, getPlaying, getCurrentIndex } from './store/selectors/player.selector';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  @ViewChild('content', {static: true}) content: ElementRef;
  @ViewChild('audio',{static: true}) a: ElementRef;

  title = 'MusicBox';
  hasScroll = false;
  currentClasses = {
    'stretch': true,
    'shrink': false
  };

  audio: HTMLAudioElement;

  songList: Song[];
  songListName: string;
  currentIndex: number;
  isPaused: boolean;

  showPrevButton: boolean = false;

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

    this.audio = this.a.nativeElement
    this.init()

    this.getDefaultPlaylist()
  }


  init() {
    this.store$.pipe(select('player'),select(getSongList)).subscribe((songList) => {
      this.songList = songList;
    })
    this.store$.pipe(select('player'),select(getSongListName)).subscribe((songListName) => {
      this.songListName = songListName;
    })
    this.store$.pipe(select('player'),select(getPlaying)).subscribe((isPaused) => {
      this.isPaused = isPaused;
    })
    this.store$.pipe(select('player'),select(getCurrentIndex)).subscribe((currentIndex) => {
      this.currentIndex = currentIndex;
    })
  }

  getDefaultPlaylist() {
    this.songsheetservice.getPlayListDetail(925007233).subscribe((songList: Song[]) => {
      console.log(songList);
      this.store$.dispatch(setSongList({songList}))
    })
  }

  onPlay() {
    this.showPrevButton = true;
    if(this.isPaused)
    {
      this.isPaused = !this.isPaused;
      this.audio.src = this.songList[this.currentIndex].url;
      this.audio.play();
    }
    else
    {
      this.isPaused = !this.isPaused
      this.audio.pause()
    }
    this.store$.dispatch(setPlaying({isPaused: this.isPaused}));

  }

  onNext() {
    this.audio.src = this.songList[(this.currentIndex + 1) % (this.songList.length)].url;
    this.store$.dispatch(setCurrentIndex({currentIndex: this.currentIndex + 1}));
    this.store$.dispatch(setPlaying({isPaused: false}));
    this.audio.play();
  }
}
