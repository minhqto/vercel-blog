import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { BlogPost } from '../../blogpost';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private ps: PostService) {}

  blogposts: BlogPost[];

  ngOnInit(): void {
    this.ps.getPosts(1, null, null).subscribe((psts) => {
      this.blogposts = psts.slice(0, 3);
    });
  }
}
