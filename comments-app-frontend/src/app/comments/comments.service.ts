import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Comment } from './comment';

@Injectable()
export class CommentService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private commentesUrl = 'http://localhost:3000/comments';  // URL to web api

  commentsMock: any = [
      {id: 11, title: 'Mr. Nice', content:"walla kuala"},
      {id: 12, title: 'Narco', content:"lorem walla 123 kuala"},
      {id: 13, title: 'Bombasto', content:"WWW lorem walla 456 kuala"}
    ];

  constructor(private http: Http) { }

  getComments(): Promise<Comment[]> {
    return this.http.get(this.commentesUrl)
               .toPromise()
               .then((response) => response.json() as Comment[])
               .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.commentesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(comment: Comment): Promise<Comment> {
    const url = `${this.commentesUrl}/${comment.id}`;
    return this.http
      .put(url, JSON.stringify(comment), {headers: this.headers})
      .toPromise()
      .then(() => comment)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

