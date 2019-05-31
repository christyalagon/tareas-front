import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Alumno } from './model/alumno'
import { NuevoAlumno } from './model/nuevoAlumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) { }

  listadoPorTutor(tutorId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(environment.apiUrl + '/alumnos/tutor/' + tutorId)
  }

  nuevoAlumno(alumno: NuevoAlumno): Observable<NuevoAlumno> {
    return this.http.post<NuevoAlumno>(environment.apiUrl + '/alumnos/nuevo', alumno)
  }


}
