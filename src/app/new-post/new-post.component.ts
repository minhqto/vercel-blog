import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { BlogPost } from '../../blogpost';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  blogPost: BlogPost;
  tags: string;

  constructor(private ps: PostService, private router: Router) {}

  ngOnInit(): void {
    this.blogPost = new BlogPost(); //need to instantiate
  }

  addPost(): void {
    this.blogPost.tags = this.tags.split(',').map((tag) => tag.trim());
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date().toLocaleDateString();
    this.blogPost.postedBy = 'Minh To';
    this.blogPost.views = 0;
    this.ps.newPost(this.blogPost).subscribe(() => {
      this.router.navigate(['/admin']);
    });
  }
}
