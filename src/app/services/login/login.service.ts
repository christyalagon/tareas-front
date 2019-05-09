import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { User } from './user'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }


  login(username: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/login/' + username)
  }
  logOut() {
    sessionStorage.removeItem('loginId')
    this.router.navigate(['/login'])
  }
  isLoggedIn(): boolean {
    if (sessionStorage.getItem('loginId')) {
      return true
    } else {
      return false
    }
  }

}
