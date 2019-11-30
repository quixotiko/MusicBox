import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-songsheet',
  templateUrl: './songsheet.component.html',
  styleUrls: ['./songsheet.component.less']
})
export class SongsheetComponent implements OnInit {
  @Input() imgUrl: string;
  @Input() name: string;
  @Input() tags: string[];

  constructor() { }

  ngOnInit() {
  }

}
