import { Component, Input, OnInit } from '@angular/core';
import { PostComment } from '../../../shared/models/PostComment';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  @Input() commentsList: Array<PostComment>;

  constructor() { }

  ngOnInit() {
    console.log('FROM COMMENTS LIST', this.commentsList)
  }

}
