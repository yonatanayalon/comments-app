import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }            from '@angular/router';

import { Comment }                from './comment';
import { CommentService }         from './comments.service';
import { ModalComponent }         from '../modal/modal.component';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: [ './comments.component.css' ]
})
export class CommentsComponent implements OnInit {
  @ViewChild('modal') modal:ModalComponent;

  comments: Comment[];

  constructor(private commentService: CommentService) { }

  getComments(): void {
    this.commentService
        .get()
        .then(comments => this.comments = comments);
  }

  updateComment(updatedComment:Comment, index:number) {
    this.commentService
        .update(updatedComment)
        .then(() => {
          this.comments[index] = updatedComment;
        });
  }

  deleteComment(comment: Comment, index:number): void {
    this.comments.splice(index,1);
    this.commentService
        .delete(comment.id)
        .then(() => {
          this.comments = this.comments.filter(h => h !== comment);
        });
  }

  userAction(data:any) {
    let action = data.action;
    this[action](data.comment, data.index);
  }

  showModal(action:string, comment:Comment, index:number) {
    this.modal.show(action,comment,index);
  }

  ngOnInit(): void {
    this.getComments();
  }
}
