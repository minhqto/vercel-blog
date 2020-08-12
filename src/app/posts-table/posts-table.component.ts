import { Component, OnInit, Output } from '@angular/core';
import { BlogPost } from '../../blogpost';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css'],
})
export class PostsTableComponent implements OnInit {
  //shows all the posts in a table
  blogPosts: BlogPost[];

  constructor(private ps: PostService, private router: Router) {}

  ngOnInit(): void {
    this.ps.getAllPosts().subscribe((allPosts) => {
      this.blogPosts = allPosts;
    });
  }

  rowClicked(event, id): void {
    this.router.navigate(['/admin/post/', id]);
  }
}
