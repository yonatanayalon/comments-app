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

  modalContent: any;
  comments: Comment[];
  selectedComment: Comment;

  constructor(
    private commentService: CommentService,
    private router: Router) { }


  userAction(data:any) {
    let action = data.action;
    this[action](data.comment, data.index);
  }

  showModal(action:string, comment:Comment, index:number) {
    this.modal.show(action,comment,index);
  }

  getComments(): void {
    this.commentService
        .getComments()
        .then(comments => this.comments = comments);
  }

  updateComment(updatedComment:Comment, index:number) {
    this.commentService
        .update(updatedComment)
        .then(() => {
          //this.comments = this.comments.filter(h => h !== updatedComment);
          this.comments[index] = updatedComment;
          if (this.selectedComment === updatedComment) { this.selectedComment = null; }
        });    
    console.log("save updatedComment: ",updatedComment);

  }

  delete(comment: Comment, index:number): void {
    console.log("delete: ",comment);
    this.comments.splice(index,1);
    this.commentService
        .delete(comment.id)
        .then(() => {
          this.comments = this.comments.filter(h => h !== comment);
          if (this.selectedComment === comment) { this.selectedComment = null; }
        });
  }

  ngOnInit(): void {
    this.getComments();
  }

  onSelect(comment: Comment): void {
    this.selectedComment = comment;
  }
}
