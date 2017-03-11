import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './routing/app-routing.module';

// Third Party
import { ModalModule } from 'ng2-bootstrap';

import { AppComponent }         from './app.component';
import { CommentsComponent }      from './comments/comments.component';
import { ModalComponent }      from './modal/modal.component';
import { CommentService }          from './comments/comments.service';

import { ConfirmDeleteComponent }         from './modal/templates/confirm-delete/confirm-delete.component';
import { EditCommentComponent }         from './modal/templates/edit-comment/edit-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    ModalComponent,
    ConfirmDeleteComponent,
    EditCommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
