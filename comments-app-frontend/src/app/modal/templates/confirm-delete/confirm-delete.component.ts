import { Component, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';

import { Comment }                from '../../../comments/comment';

@Component({
  selector: 'confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: [ './confirm-delete.component.css' ]
})

export class ConfirmDeleteComponent {
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