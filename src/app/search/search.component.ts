import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { SearchServiceService } from '../services/search-service.service';
import { map, switchMap, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { PlayLists } from '../services/common.types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  @ViewChild('input',{static: true}) i: ElementRef;
  playlists: PlayLists;


  input: HTMLInputElement;
  constructor(private searchservice: SearchServiceService) { }

  ngOnInit() {
    this.input = this.i.nativeElement;
    fromEvent(this.input,'keyup').pipe(
      filter((e) => this.input.value != '' ),//出现错误是因为当把搜索框里的文字清空时input的value为空，所以要过滤掉空值
      map(() => {
        return this.input.value
      }),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((keywords) => {
        return this.searchservice.getSearchResults(keywords)
      })
    ).subscribe((res) => {
      // console.log(res);
      this.playlists = res;
    })
  }

}
