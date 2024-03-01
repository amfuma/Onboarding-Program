import {Injectable} from '@angular/core';
import {User} from 'src/models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {UserRequestDto} from "../app/user-request-dto";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: UserRequestDto) {
    console.log(user)
    return this.http.post<User>(this.usersUrl, user);
  }

  public login(credentials: CredentialsDto): Observable<User> {
    // @ts-ignore
    return this.http.post<User>(`${this.usersUrl}/login`, credentials).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }


  public findCompanyActiveUsers(): Observable<User[]> {

    return this.http.get<User[]>('http://localhost:8080/company/6/active-users');
  }
}

export class CredentialsDto {
  username: string | undefined;
  password: string | undefined;
}
