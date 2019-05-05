import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  login(username: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/login', username)
  }
  isLoggedIn(): boolean {
    if (sessionStorage.getItem('loginId')) {
      return true;
    } else {
      return false;
    };
  }

}
