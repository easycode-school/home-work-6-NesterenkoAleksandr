import { Component, OnInit } from '@angular/core';
import { IPost } from './../../interfaces/ipost';
import { PostsService } from './../../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  /**
   * Список постов
   */
  public posts: IPost[];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts().subscribe(
      (posts: IPost[]) => {
        this.posts = posts;
      }
    );

    this.postsService.postObservableSubject.subscribe((posts: IPost[]) => {
      this.posts = posts;
    });
  }

  /**
   * Удаление поста
   * @param id идентификатор поста
   */
  public onDeletePost(id: number) {
    this.postsService.deletePost(id).subscribe(() => {
      // Удаление поста изи разметки
      this.posts = this.posts.filter((post: IPost) =>  post.id !== id);
    });
  }
}
