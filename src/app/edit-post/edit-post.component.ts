import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPost } from '../../blogpost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  blogPost: BlogPost;
  tags: string;

  constructor(
    private ps: PostService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let postId = this.actRoute.snapshot.params['id']; //ID comes from the router's path parameter.  ex. { path: 'admin/post/:id', component: EditPostComponent },
    this.ps.getPostById(postId).subscribe((post) => {
      this.blogPost = post;
      this.tags = this.blogPost.tags.toString();
    });
  }

  updatePost(): void {
    this.ps.updatePostById(this.blogPost._id, this.blogPost).subscribe(() => {
      this.blogPost.tags = this.tags.split(',').map((tag) => tag.trim());
      this.router.navigate(['/admin']);
    });
  }

  deletePost(): void {
    this.ps.deletePostById(this.blogPost._id).subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }
}
