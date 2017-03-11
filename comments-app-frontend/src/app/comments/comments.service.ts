import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Comment } from './comment';

@Injectable()
export class CommentService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private commentesUrl = 'http://localhost:3000/comments';  // URL to web api

  constructor(private http: Http) { }

  get(): Promise<Comment[]> {
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

