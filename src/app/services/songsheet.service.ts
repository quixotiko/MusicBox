import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlayLists, Song } from './common.types';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, toArray, mergeMap, startWith, scan, sampleTime, filter, timestamp, distinctUntilChanged, takeWhile, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SongsheetService {
  cache: Song[];

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

  getPlayListDetail(id): Observable<Song[]> {//返回带有url的Song[]
    const options = { params: new HttpParams().set('id', id) };
    return this.http.get('http://localhost:3000/playlist/detail', options).pipe(
      map((data: any) => {
        let songs = data.playlist.tracks.map((song) => {
          let songInfo = {
            id: song.id,
            name: song.name,
            artist: song.ar,
            duration: song.dt,
            imgUrl: song.al.picUrl
          }
          return songInfo
        })
        return songs;
      }),
      tap((songs) => {
        this.cache = songs; //写在这里
      }),
      switchMap((songs: Song[]) => {
        return from(songs).pipe(//需要把数组中的每一个取出来，根据它们的id请求音乐的url
          // tap((song) => {
          //   this.cache = song;//需要缓存song的其他属性         //不能写在这里!!!因为getsongurl那里的cache只会获取到最后一个song的数据
          //   // console.log(song);
          // }),
          mergeMap((song) => {
            return this.getSongUrl(song.id).pipe(
              map((song) => {
                return { ...this.cache[0], url: song.url }//最后订阅者获取的数据流是最里面的observable发射的数据
              }),
              tap(() => {
                this.cache.shift();//为了使得cache[0]的song的其他属性与当前song的url一致
              })
            )
          }),
          toArray()
        )
      })
    )
  }

  getSongUrl(id): Observable<Song> {
    const options = { params: new HttpParams().set('id', id) };
    return this.http.get('http://localhost:3000/song/url', options).pipe(
      map((data: any) => {
        return {
          url: data.data[0].url
        }
      })
    )
  }

}
