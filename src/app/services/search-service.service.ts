import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(private http: HttpClient) { }

  getSearchResults(keywords: string) {
    const options = { params: new HttpParams().set('keywords', keywords).append('type','1000') };
    return this.http.get('http://localhost:3000/search',options).pipe(
      map((res: {result: {playlists}}) => {
        console.log(res);
        return {
          playlists: res.result.playlists
        }
      }),
      catchError((err, caught) => caught)
    )
  }
}

