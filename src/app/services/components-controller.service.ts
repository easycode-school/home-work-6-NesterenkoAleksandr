import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/ipost';
import { IUser } from './../interfaces/IUser';
import { BehaviorSubject } from 'rxjs';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentsControllerService {
  private _posts: IPost[];
  private _users: IUser[];
  private _currentPost: IPost = {
    userId: null,
    id: null,
    title: '',
    body: ''
  };

  /** Признак того, что выполняется редактирование поста */

  private _currentPostSource = new BehaviorSubject(this._currentPost);
  public currentPostObservableSubject = this._currentPostSource.asObservable();

  private _postsSource = new BehaviorSubject(this._posts);
  public postsObservableSubject = this._postsSource.asObservable();

  private _usersSource = new BehaviorSubject(this._users);
  public usersObservableSubject = this._usersSource.asObservable();

  constructor(private server: ServerService) { }

  /**
   * Редактировать пост
   * @param post пост для редактирования
   */
  public editPost(post: IPost) {
    this._currentPost = Object.assign({}, post);
    this._currentPostSource.next(this._currentPost);
  }

  /**
   * Отменить редактирование
   */
  public cancel() {
    this._currentPost = {
      userId: null,
      id: null,
      title: '',
      body: ''
    };
    this._currentPostSource.next(this._currentPost);
  }

  /**
   * Список постов
   */
  public getPosts() {
    this.server.getPosts().subscribe(
      (posts: IPost[]) => {
        this._posts = posts;
        this._postsSource.next(this._posts);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * Удалить пост
   * @param postId идентификатор поста
   */
  public deletePost(postId: number) {
    this.server.deletePost(postId).subscribe(
      () => {
        this._posts = this._posts.filter((post: IPost) =>  post.id !== postId);
        this._postsSource.next(this._posts);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * Добавить пост
   * @param post экземпляр поста
   */
  public addPost(post: IPost) {
    this.server.addPost(post).subscribe(
      (newPost: IPost) => {
        // Идентификатор нового поста (вместо 101)
        newPost.id = Math.floor(Math.random() * 899 ) + 101;
        this._posts.unshift(Object.assign({}, newPost));
        this._postsSource.next(this._posts);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * Изменить пост
   * @param post экземпляр нового поста
   */
  public updatePost(post: IPost) {
    this.server.updatePost(post).subscribe(
      () => {
        this._posts = this._posts.map((item) => item.id === post.id ? Object.assign({}, post) : item);
        this._postsSource.next(this._posts);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * Список пользователей
   */
  public getUsers() {
    this.server.getUsers().subscribe(
      (users: IUser[]) => {
        this._users = users;
        this._usersSource.next(this._users);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * Получить пользователя по его идентификатору
   * @param userId идентификатор пользователя
   */
  public getUser(userId: number) {
    return this.server.getUser(userId);
  }

  /**
   * Комментарии поста
   * @param postId идентификатор поста
   */
  public getPostComments(postId: number) {
    return this.server.getPostComments(postId);
  }
}
