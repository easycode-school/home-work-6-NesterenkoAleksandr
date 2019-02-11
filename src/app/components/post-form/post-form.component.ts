import { Component, OnInit, ViewChild } from '@angular/core';
import { IPost } from './../../interfaces/ipost';
import { NgForm } from '@angular/forms';
import { PostsService } from './../../services/posts.service';
import { IUser } from './../../interfaces/iuser';
import { UsersService } from './../../services/users.service';
import { PostFormService } from './../../services/post-form.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  /**
   * Текущий пост
   */
  public post: IPost;

  /**
   * Список пользователей
   */
  private users: IUser[];

  constructor(private usersService: UsersService, private postFormService: PostFormService
  ) { }

  ngOnInit() {
    this.postFormService.postObservableSubject.subscribe((currentPost: IPost) => {
      this.post = currentPost;
    });
  }

  /**
   * Обработчик события формы "Submit"
   */
  public onSubmit() {
    // Если форма не прошла валидацию
    if (this.form.invalid) {
      return;
    }
    this.postFormService.onSubmit(this.post);
    this.form.resetForm();
  }

  /**
   * Обработчик нажатия на кнопку "Cancel"
   */
  public onCancel() {
    this.postFormService.onCancel();
    this.form.resetForm();
  }

}
