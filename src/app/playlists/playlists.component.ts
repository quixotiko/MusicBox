import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PlayLists } from '../services/common.types';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.less']
})
export class PlaylistsComponent implements OnInit {

  playlistsInfo: {playlists: PlayLists[],total: number};

  
  constructor(private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.route.data.pipe(
      map(res => res.playlistsData)
    ).subscribe((data) => {
      this.playlistsInfo = {
        playlists: data.playlists,
        total: data.total
      };
    })
  }

}
