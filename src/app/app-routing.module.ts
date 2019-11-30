import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'playlists',
    loadChildren: () => import('./playlists/playlists.module').then(mod => mod.PlaylistsModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(mod => mod.SearchModule)
  },
  {
    path: '',
    redirectTo: '/playlists',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/playlists'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
