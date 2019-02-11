import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { IPost } from './../../interfaces/IPost';
import { CommentsService } from './../../services/comments.service';
import { IComment } from './../../interfaces/icomment';
import { PostFormService } from './../../services/post-form.service';
import { PostsService } from './../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Output() postDeleted = new EventEmitter();
  @Input() public post: IPost;

  private comments: IComment[];

  /**
   * Имя автора поста
   */
  private userName: string;

  constructor(private userService: UsersService
              , private commentsService: CommentsService
              , private postFormService: PostFormService
    ) { }

  ngOnInit() {
    // Определение имени автора поста по его идентификатору
    this.userName = this.userService.getUserNameById(this.post.userId);
  }

  /**
   * Обработчик нажатия на кнопку "Delete"
   */
  public onDelete(): void {
    if (confirm('Are you sure, you want to delete this post?')) {
      this.postDeleted.emit();
    }
  }

  /**
   * Обработчик нажатия на кнопку "ShowComments"
   * @param postId идентификатор поста
   */
  public onShowComments(postId: number): void {
    this.commentsService.getPostComments(this.post.id).subscribe(
      (comments: IComment[]) => {
        this.comments = comments;
      }
    );
  }

  /**
   * Обработчик нажатия на кнопку "Edit"
   * @param post пост, для редактирования
   */
  public onEdit(post: IPost): void {
    this.postFormService.onEditPost(this.post);
  }

}
