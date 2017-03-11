import { Component, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';

import { Comment } from '../../../comments/comment';

@Component({
  selector: 'edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: [ './edit-comment.component.css' ]
})

export class EditCommentComponent {
  @Input() comment:Comment;
  @Input() index:number;
  @Output() userAction: EventEmitter<any> = new EventEmitter();
  
  ok(action:string,comment:Comment, index:number):void {
    let data = {'userAction':'ok', 'action': action,'comment':comment, 'index':index};
    this.userAction.emit(data);
  }
  
  cancel():void {
    let data = {'userAction':'cancel'};
    this.userAction.emit(data);
  }
  
}