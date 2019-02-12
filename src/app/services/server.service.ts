import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { IPost } from '../interfaces/ipost';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private _apiUrl: string = environment.apiUrl;

  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  /**
   * Получить список всех постов
   */
  public getPosts() {
    return this.http.get(`${this._apiUrl}/posts`).pipe(
      retry(2),
      catchError(this.errorService.handleError)
    );
  }

  /**
   * Удаление поста
   * @param id идентификатор удаляемого поста
   */
  public deletePost(id: number) {
    return this.http.delete(`${this._apiUrl}/posts/${id}`, this._httpOptions).pipe(
      retry(2),
      catchError(this.errorService.handleError)
    );
  }

  /**
   * Добавление нового поста
   * @param post новый пост
   */
  public addPost(post: IPost) {
    return this.http.post(`${this._apiUrl}/posts`, post, this._httpOptions).pipe(
      retry(2),
      catchError(this.errorService.handleError)
    );
  }

  /**
   * Изменение поста
   * @param post измененный пост
   */
  public updatePost(post: IPost) {
    return this.http.put(`${this._apiUrl}/posts/${post.id}`, post, this._httpOptions).pipe(
      retry(2),
      catchError(this.errorService.handleError)
    );
  }

  /**
   * Получить список всех коментариев поста
   * @param postId идентификатор поста
   */
  public getPostComments(postId: number) {
    return this.http.get(`${this._apiUrl}/comments?postId=${postId}`).pipe(
      retry(2),
      catchError(this.errorService.handleError)
    );
  }

  /**
   * Получить список пользователей
   */
  public getUsers() {
    return this.http.get(`${this._apiUrl}/users`).pipe(
      retry(2),
      catchError(this.errorService.handleError)
    );
  }

  /**
   * Получить пользователя по его идентификатору
   * @param id идентификатор пользователя
   */
  public getUser(id: number) {
    return this.http.get(`${this._apiUrl}/users/${id}`).pipe(
      retry(2),
      catchError(this.errorService.handleError)
    );
  }
}
