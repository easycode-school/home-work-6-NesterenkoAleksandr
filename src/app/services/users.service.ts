import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map, retry, catchError } from 'rxjs/operators';
import { IUser } from './../interfaces/IUser';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService  {
  private apiUrl: string = environment.apiUrl;
  private users: IUser[];

  constructor(private http: HttpClient, private errorService: ErrorService) {
    this.getUsers().subscribe((users: IUser[]) => {
      this.users = users;
    });
  }

  /**
   * Получить список пользователей
   */
  public getUsers() {
    return this.http.get(`${this.apiUrl}/users`).pipe(
      retry(2),
      map((users: IUser[]) => {
        return users;
      }),
      catchError(this.errorService.handleError)
    );
  }

  /**
   * Получить полное имя пользователя по его идентификатору
   * @param id идентификатор пользователя
   * @return строка с именем пользователя
   */
  public getUserNameById(id: number): string {
    const users: IUser[] = this.users.filter((user: IUser) => user.id === id);
    return users.length ? users[0].name : 'Unknown';
  }
}
