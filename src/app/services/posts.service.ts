import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { IPost } from '../interfaces/ipost';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, map, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl: string = environment.apiUrl;
  private posts: IPost[];
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  /**
   * Счетчик для формирования id новых постов
   */
  private postCounter: number;

  private _postSource = new BehaviorSubject(this.posts);
  public postObservableSubject = this._postSource.asObservable();

  constructor(private http: HttpClient, private errorService: ErrorService) {  }

  /**
   * Получить список всех постов
   */
  public getPosts() {
    return this.http.get(`${this.apiUrl}/posts`).pipe(
      retry(2),
      map((posts: IPost[]) => {
        this.posts = posts;
        this.postCounter = this.posts.length;
        return this.posts;
      }),
      catchError(this.errorService.handleError)
    );
  }

  /**
   * Удаление поста
   * @param id идентификатор удаляемого поста
   */
  public deletePost(id: number) {
    return this.http.delete(`${this.apiUrl}/posts/${id}`, this.httpOptions).pipe(
      retry(2),
      catchError(this.errorService.handleError)
    );
  }

  /**
   * Добавление нового поста
   * @param post новый пост
   */
  public addPost(post: IPost) {
    post.id = ++this.postCounter;
    this.posts.unshift(Object.assign({}, post));
    this._postSource.next(this.posts);
    return this.http.post(`${this.apiUrl}/posts`, post, this.httpOptions).pipe(
      retry(2),
      catchError(this.errorService.handleError)
    );
  }

  /**
   * Изменение поста
   * @param post измененный пост
   */
  public updatePost(post: IPost) {

    this.posts = this.posts.map((item) => item.id === post.id ? Object.assign({}, post) : item);
    this._postSource.next(this.posts);
    return this.http.put(`${this.apiUrl}/posts/${post.id}`, post, this.httpOptions).pipe(
      retry(2),
      catchError(this.errorService.handleError)
    );
  }
}
