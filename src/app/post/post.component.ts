import { Component, OnInit, Input } from '@angular/core';
import blogData from '../../blogData.json';
import { BlogPost } from '../../blogpost';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  blogPosts: Array<BlogPost> = blogData;
  count: number;
  constructor() {}

  ngOnInit(): void {}
  setCount(count) {
    this.count = count;
  }
  getCount() {
    return this.count;
  }
}
