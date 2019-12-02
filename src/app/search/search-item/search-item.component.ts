import { Component, OnInit, Input } from '@angular/core';
import { SearchServiceService } from 'src/app/services/search-service.service';
import { Store } from '@ngrx/store';
import { SongsheetService } from 'src/app/services/songsheet.service';
import { Song } from 'src/app/services/common.types';
import { setSongList, setCurrentIndex, setSongListName, setPlaying, setIsNew, setCurrentTime } from 'src/app/store/actions/player.action';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.less']
})
export class SearchItemComponent implements OnInit {
  @Input() name: string;
  @Input() id: number;
  @Input() imgUrl: string;

  constructor(private songsheetService: SongsheetService, private store$: Store<any>) { }

  ngOnInit() {
  }

  addList() { 
    this.songsheetService.getPlayListDetail(this.id).subscribe((songList: Song[]) => {
      this.store$.dispatch(setSongList({ songList }));
      this.store$.dispatch(setCurrentIndex({ currentIndex: 0 }));
      this.store$.dispatch(setPlaying({ isPaused: true }));
      this.store$.dispatch(setSongListName({ songListName: this.name }));
      this.store$.dispatch(setCurrentTime({ currentTime: songList[0].duration }));
      this.store$.dispatch(setIsNew({ isNew: true }));
    })
  }
  
}
