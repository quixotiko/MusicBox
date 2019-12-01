import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SongsheetService } from './services/songsheet.service';
import { Song } from './services/common.types';
import { Store, select } from '@ngrx/store';
import { setSongList, setPlaying, setCurrentIndex, setCurrentTime } from './store/actions/player.action';
import { getSongList, getSongListName, getPlaying, getCurrentIndex, getCurrentTime } from './store/selectors/player.selector';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  @ViewChild('progressBar', { static: true }) pb: ElementRef;
  @ViewChild('audio', { static: true }) a: ElementRef;
  @ViewChild('dot', { static: true }) d: ElementRef;

  title = 'MusicBox';
  hasScroll = false;
  currentClasses = {
    'stretch': true,
    'shrink': false
  };
  dotStyle = {};

  audio: HTMLAudioElement;
  progressBar: HTMLDivElement;
  dot: HTMLSpanElement;

  songList: Song[];
  songListName: string;
  currentIndex: number;
  isPaused: boolean;
  currentTime: number;
  intervalId: any;

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
    this.progressBar = this.pb.nativeElement
    this.dot = this.d.nativeElement;

    this.init()

    this.getDefaultPlaylist()


  }


  init() {
    this.store$.pipe(select('player'), select(getSongList)).subscribe((songList) => {
      this.songList = songList;
    })
    this.store$.pipe(select('player'), select(getSongListName)).subscribe((songListName) => {
      this.songListName = songListName;
    })
    this.store$.pipe(select('player'), select(getPlaying)).subscribe((isPaused) => {
      this.isPaused = isPaused;
    })
    this.store$.pipe(select('player'), select(getCurrentIndex)).subscribe((currentIndex) => {
      this.currentIndex = currentIndex;
    })
    this.store$.pipe(select('player'), select(getCurrentTime)).subscribe((currentTime) => {
      this.currentTime = currentTime;
    })
  }

  getDefaultPlaylist() {
    this.songsheetservice.getPlayListDetail(925007233).subscribe((songList: Song[]) => {
      console.log(songList);
      this.store$.dispatch(setSongList({ songList }));
      this.store$.dispatch(setCurrentTime({ currentTime: songList[this.currentIndex].duration }));
    })
  }

  setAudioPlay() {
    this.audio.play();
    this.intervalId = setInterval(() => {
      this.store$.dispatch(setCurrentTime({ currentTime: this.currentTime - 1000 }))
      this.setDotLeft();//时间减少时设置dot的left属性
      if (this.currentTime < 0) {
        this.onNext();
      }
    }, 1000)
  }

  setAudioPause() {
    this.audio.pause();
    window.clearInterval(this.intervalId);
  }
  onPlay() {
    this.showPrevButton = true;
    if (this.isPaused) {
      this.isPaused = !this.isPaused;
      this.audio.src = this.songList[this.currentIndex].url;
      this.setAudioPlay();
    }
    else {
      this.isPaused = !this.isPaused;
      this.setAudioPause();
    }
    this.store$.dispatch(setPlaying({ isPaused: this.isPaused }));

  }

  onNext() {
    this.setAudioPause();//为了在播放下一首个时把计时器清除，这里调用一下这个函数
    this.showPrevButton = true;
    let index = ((this.currentIndex + 1) === this.songList.length ? 0 : (this.currentIndex + 1));
    this.audio.src = this.songList[index].url;
    this.store$.dispatch(setCurrentIndex({ currentIndex: index }));
    this.store$.dispatch(setCurrentTime({ currentTime: this.songList[this.currentIndex].duration }));
    this.store$.dispatch(setPlaying({ isPaused: false }));
    this.setAudioPlay();
  }
  onPrev() {
    this.setAudioPause();
    let index = ((this.currentIndex - 1) < 0 ? (this.songList.length - 1) : (this.currentIndex - 1));
    this.audio.src = this.songList[index].url;
    this.store$.dispatch(setCurrentIndex({ currentIndex: index }));
    this.store$.dispatch(setCurrentTime({ currentTime: this.songList[this.currentIndex].duration }));
    this.store$.dispatch(setPlaying({ isPaused: false }));
    this.setAudioPlay();
  }

  setDotLeft() {
    let width = parseInt(window.getComputedStyle(this.progressBar).width);
    let T = this.songList[this.currentIndex].duration;
    let left = width * (T - this.currentTime) / T;
    // console.log(left);
    this.dotStyle = {
      'left': left + 'px'
    }
  }
}
