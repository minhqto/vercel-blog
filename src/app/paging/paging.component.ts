import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css'],
})
export class PagingComponent implements OnInit {
  @Input() page: number;
  @Input() noMorePosts: boolean = false;
  @Output() newPage = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  leftPageClicked() {
    if (this.page > 1) {
      this.page--;
      this.newPage.emit(this.page);
    }
  }

  rightPageClicked() {
    this.newPage.emit(this.page + 1);
  }
}
