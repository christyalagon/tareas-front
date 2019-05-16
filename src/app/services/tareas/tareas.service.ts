import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Tareas } from './model/tareas'
import { TareaYAlumno } from './model/tareaYAlumno'
import { TareaYAlumnoNombre } from './model/tareaYAlumnoNombre'

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private http: HttpClient) { }

  addTareaSinAlumno(tarea: Tareas): Observable<Tareas> {
    return this.http.post<Tareas>(environment.apiUrl + '/tareas/nueva', tarea)
  }
  addTareaConAlumno(tarea: TareaYAlumno): Observable<Tareas> {
    return this.http.post<Tareas>(environment.apiUrl + '/tareas/nueva/alumno', tarea)
  }
  asignacionTareasListado(tareas: TareaYAlumno[]): Observable<TareaYAlumno> {
    return this.http.post<TareaYAlumno>(environment.apiUrl + '/tareas/nueva/alumno/lista', tareas)
  }
  puntuarTareas(tareas: TareaYAlumnoNombre[]) {
    return this.http.post<TareaYAlumnoNombre>(environment.apiUrl + '/tareas/puntuar', tareas)
  }
  listadoTareasSinAsignar(): Observable<Tareas[]> {
    return this.http.get<Tareas[]>(environment.apiUrl + '/tareas/listado/asignacion')
  }
  listadoTareasConAsignacion(): Observable<TareaYAlumnoNombre[]> {
    const tutorId = sessionStorage.getItem('loginId')
    return this.http.get<TareaYAlumnoNombre[]>(environment.apiUrl + '/tareas/puntuar/' + tutorId)
  }
}
