import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alumno } from './model/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) { }

  listadoPorTutor(tutorId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(environment.apiUrl + '/alumnos/tutor/' + tutorId)
  }
}
