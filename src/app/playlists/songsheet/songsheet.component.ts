import { Component, OnInit, Input } from '@angular/core';
import { SongsheetService } from 'src/app/services/songsheet.service';
import { Song } from 'src/app/services/common.types';
import { Store } from '@ngrx/store';
import { setSongList, setCurrentTime, setCurrentIndex, setPlaying, setSongListName, setIsNew } from 'src/app/store/actions/player.action';

@Component({
  selector: 'app-songsheet',
  templateUrl: './songsheet.component.html',
  styleUrls: ['./songsheet.component.less']
})
export class SongsheetComponent implements OnInit {
  @Input() imgUrl: string;
  @Input() name: string;
  @Input() tags: string[];
  @Input() id: number;

  constructor(private songsheetservice: SongsheetService,private store$: Store<any>) { }

  ngOnInit() {
  }

  addList() {
    this.songsheetservice.getPlayListDetail(this.id).subscribe((songList: Song[]) => {
      this.store$.dispatch(setSongList({ songList }));
      this.store$.dispatch(setCurrentIndex({ currentIndex: 0 }));
      this.store$.dispatch(setPlaying({ isPaused: true }));
      this.store$.dispatch(setSongListName({ songListName: this.name }));
      this.store$.dispatch(setCurrentTime({ currentTime: songList[0].duration }));
      this.store$.dispatch(setIsNew({ isNew: true }));
    })
  }

}
