import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../../blogpost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css'],
})
export class LatestPostsComponent implements OnInit {
  constructor(private ps: PostService, private actRoute: ActivatedRoute) {}
  @Input() updatedCount;

  posts: BlogPost[];
  ngOnInit(): void {
    this.ps.getPosts(1, null, null).subscribe((psts) => {
      this.posts = psts.slice(0, 3);
      this.posts.forEach((post) => {
        if (post._id == this.actRoute.snapshot.params['id']) {
          post.views = this.updatedCount;
        }
      });
    });
  }
}
