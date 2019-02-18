import { Component, OnInit } from '@angular/core';
import { IPost } from './../../interfaces/ipost';
import { ComponentsControllerService } from './../../services/components-controller.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  /**
   * Список постов
   */
  private _posts: IPost[];

  constructor(private componentsController: ComponentsControllerService) { }

  ngOnInit() {
    this.componentsController.getPosts();
    this.componentsController.postsObservableSubject.subscribe((posts: IPost[]) => {
      this._posts = posts;
    });
  }
}
