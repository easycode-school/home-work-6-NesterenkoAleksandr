import { Component, OnInit, Input } from '@angular/core';
import { IPost } from './../../interfaces/IPost';
import { IComment } from './../../interfaces/icomment';
import { ComponentsControllerService } from './../../services/components-controller.service';
import { IUser } from './../../interfaces/IUser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  /** Текущий пост */
  @Input() public post: IPost;

  /** Список комментариев поста */
  private _comments: IComment[];

  /** Автор поста */
  private _user: IUser;

  constructor(private componentsController: ComponentsControllerService) { }

  ngOnInit() {
    // Определение автора поста по его идентификатору
    this.componentsController.getUser(this.post.userId).subscribe(
      (user: IUser) => {
        this._user = user;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * Обработчик нажатия на кнопку "Delete"
   */
  public onDelete(): void {
    if (confirm('Are you sure, you want to delete this post?')) {
      this.componentsController.deletePost(this.post.id);
    }
  }

  /**
   * Обработчик нажатия на кнопку "ShowComments"
   * @param postId идентификатор поста
   */
  public onShowComments(postId: number): void {
    if (this._comments) {
      return this._comments = null;
    }

    this.componentsController.getPostComments(this.post.id).subscribe(
      (comments: IComment[]) => {
        this._comments = comments;
      }
    );
  }

  /**
   * Обработчик нажатия на кнопку "Edit"
   * @param post пост, для редактирования
   */
  public onEdit(post: IPost): void {
    this.componentsController.editPost(post);
  }
}
