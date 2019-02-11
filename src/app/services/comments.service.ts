import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { IComment } from '../interfaces/icomment';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { retry, map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl: string = environment.apiUrl;
  private comments: IComment[];

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  public getPostComments(postId: number) {
    return this.http.get(`${this.apiUrl}/comments?postId=${postId}`).pipe(
      retry(2),
      map((comments: IComment[]) => {
        this.comments = comments;
        return this.comments;
      }),
      catchError(this.errorService.handleError)
    );
  }
}
