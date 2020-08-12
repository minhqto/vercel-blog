import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BlogPost } from '../../blogpost';
//import blogData from '../../blogData.json';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogPosts: Array<BlogPost>;
  page: number = 1;
  tag: String = null;
  category: String = null;
  querySub: any;
  noMorePosts: boolean = false;

  constructor(private ps: PostService, private actRoute: ActivatedRoute) {}

  getPage(num): void {
    this.ps.getPosts(num, this.tag, this.category).subscribe((posts) => {
      if (posts.length > 0) {
        this.page = num;
        this.blogPosts = posts;
      }
    });
  }

  ngOnInit(): void {
    this.querySub = this.actRoute.queryParams.subscribe((params) => {
      if (params['tag']) {
        this.tag = params['tag'];
        this.category = null;
      } else {
        this.tag = null;
      }
      if (params['category']) {
        this.category = params['category'];
        this.tag = null;
      } else {
        this.category = null;
      }
      this.getPage(+params['page'] || 1);
    });
  }

  ngOnDestory() {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }
}
