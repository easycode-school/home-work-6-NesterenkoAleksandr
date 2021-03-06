import { Component, OnInit, ViewChild } from '@angular/core';
import { IPost } from './../../interfaces/ipost';
import { NgForm } from '@angular/forms';
import { ComponentsControllerService } from './../../services/components-controller.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  /** Текущий пост */
  private _post: IPost;

  /** Режим формы (true - редактирование; false - добавление) */
  private _isEdit = false;

  constructor(private componentsController: ComponentsControllerService) { }

  ngOnInit() {
    this.componentsController.currentPostObservableSubject.subscribe((currentPost: IPost) => {
      // Если нет id поста, тогда происходит добавление поста, в противном случае - изменение
      this._isEdit = !!currentPost.id;
      this._post = currentPost;
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
    if (this._isEdit) {
      this.componentsController.updatePost(Object.assign({}, this._post));
    } else {
      this.componentsController.addPost(Object.assign({}, this._post));
    }

    this.componentsController.cancel();
    this.form.resetForm();
  }

  /**
   * Обработчик нажатия на кнопку "Cancel"
   */
  public onCancel() {
    this.componentsController.cancel();
    this.form.resetForm();
  }

}
