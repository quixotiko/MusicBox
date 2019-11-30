import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayLists, Song } from './common.types';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, toArray, mergeMap, startWith, scan, sampleTime, filter, timestamp, distinctUntilChanged, takeWhile, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class SongsheetService {

  constructor(private http: HttpClient) { }

  getPlayLists(): Observable<PlayLists> {
    const options = { params: new HttpParams().set('limit', '300') };
    return this.http.get('http://localhost:3000/top/playlist/highquality', options).pipe(
      map((res: { playlists: any[], total: number }) => {
        return {
          playlists: res.playlists,
          total: res.total
        }
      })
    )
  }

  getPlayListDetail(id): Observable<Song[]> {
    const options = { params: new HttpParams().set('id', id) };
    return this.http.get('http://localhost:3000/playlist/detail', options).pipe(
      map((data: any) => {
        let songs = data.playlist.tracks.map((song) => {
          return {
            id: song.id,
            name: song.name,
            artist: song.ar,
            duration: song.dt,
            imgUrl: song.al.picUrl,
            url: `https://music.163.com/song/media/outer/url?id=${id}.mp3`
          }
        })
        return songs;
      })
    )
  }

  getSongUrl(id): Observable<Song> {
    const options = { params: new HttpParams().set('id', id) };
    return this.http.get('http://localhost:3000/song/url',options).pipe(
      map((data:any) => {
        return {
          url: data.data[0].url
        }
      })
    )
  }

}
