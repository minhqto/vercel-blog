import { Component, OnInit, Input } from '@angular/core';
import blogData from '../../blogData.json';
import { BlogPost } from '../../blogpost';
import { PostService } from '../post.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  blogposts: BlogPost[];
  constructor(private ps: PostService) {}

  ngOnInit(): void {
    this.ps.getPosts(1, null, null).subscribe((psts) => {
      this.blogposts = psts;
    });
  }
}
