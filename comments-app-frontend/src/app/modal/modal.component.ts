import { Component, ViewChild, Injectable, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { Comment }                from '../comments/comment';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: [ './modal.component.css' ]
})

export class ModalComponent {
  @Input() comment:Comment;
  @Output() sendAction: EventEmitter<any> = new EventEmitter();
  @ViewChild('modal') modal:ModalDirective;
  confirmDelete: boolean = false;
  editComment: boolean = false;
  currentAction:string;
  currentIndex: number;

  constructor(private element: ElementRef) {
  
  }
  userAction(data:any) {
    //let comment:Comment = data.comment;
    this[data.userAction](data);
  }

  show(action:string, comment:Comment, index:number):void {
    this.currentIndex = index;
    this.currentAction = action;
    this.comment = JSON.parse(JSON.stringify(comment));
    this[action] = true;
    this.modal.show();
  }

  hide():void {
    this.modal.hide();
  }

  ok(data:any):void {
    this.sendAction.emit(data);
    this.hide();
  }
  
  cancel():void {
    this.hide();
  }
  
  onHide(): void {
    this[this.currentAction] = false;
  }
}