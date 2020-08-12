import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  tags: any;

  constructor(private ps: PostService) {
    this.ps.getTags().subscribe((t) => {
      this.tags = t;
    });
  }

  ngOnInit(): void {}
}
