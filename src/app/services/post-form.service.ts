import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/ipost';
import { BehaviorSubject } from 'rxjs';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class PostFormService {
  /**
   * Текущий пост
   */
  private post: IPost = {
    userId: null,
    id: null,
    title: '',
    body: ''
  };

  /**
   * Признак того, что пост редактируется
   */
  public isEdit = false;

  constructor(private postsService: PostsService) { }

  private _postSource = new BehaviorSubject(this.post);
  public postObservableSubject = this._postSource.asObservable();

  /**
   * Редактирование поста
   * @param post редактируемый пост
   */
  public onSubmit(post: IPost): void {
    if (!this.isEdit) {
      this.addPost(post);
      return;
    }
    this.updatePost(post);
  }

  /**
   * Редактирование поста
   * @param post редактируемый пост
   */
  public onEditPost(post: IPost): void {
    this.post = Object.assign({}, post);
    this._postSource.next(this.post);
    this.isEdit = true;
  }

  /**
   * Отменить режим редактирования
   */
  public onCancel() {
    this.isEdit = false;
  }

  /**
   * Добавление поста
   * @param post добавляемый пост
   */
  public addPost(post: IPost) {
    this.postsService.addPost(this.post);
    this.onCancel();
  }

  public updatePost(post: IPost) {
    this.postsService.updatePost(this.post);
    this.onCancel();
  }
}
