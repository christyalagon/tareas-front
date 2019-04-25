import { Injectable } from '@angular/core'

import { Test } from './test';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }


  // private userUrl = '/api';

  getData(): Observable<Test[]> {
    return this.http.get<Test[]>(environment.apiUrl + '/product/list/test');
  }

  addData(data: Test): Observable<Test> {
    return this.http.post<Test>(environment.apiUrl + '/product/test', data)
  }
}
