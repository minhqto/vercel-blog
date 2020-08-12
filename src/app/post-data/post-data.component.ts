import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BlogPost } from '../..//blogpost';
import { PostService } from '../post.service';
import { ActivatedRoute, ɵEmptyOutletComponent } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css'],
})
export class PostDataComponent implements OnInit {
  post: BlogPost;
  querySub: any;
  commentName: string;
  commentText: string;

  constructor(private ps: PostService, private actRoute: ActivatedRoute) {}

  @Output() viewClick = new EventEmitter();

  ngOnInit(): void {
    this.querySub = this.actRoute.params.subscribe((params) => {
      this.ps.getPostById(params['id']).subscribe((pst) => {
        this.post = pst;
        this.post.views++;
        this.ps.updatePostById(this.post._id, this.post).subscribe();
        this.viewClick.emit(this.post.views);
      });
    });
  }

  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
  }

  submitComment(): void {
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString(),
    });

    this.ps.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentName = '';
      this.commentText = '';
    });
  }
}
