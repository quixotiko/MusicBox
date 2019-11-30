import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistsComponent } from './playlists.component';
import { SongsheetResolverService } from '../services/songsheet-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: PlaylistsComponent,
    resolve: {playlistsData: SongsheetResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
