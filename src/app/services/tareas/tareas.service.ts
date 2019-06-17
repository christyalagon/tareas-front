import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Tareas } from './model/tareas'
import { TareaYAlumno } from './model/tareaYAlumno'
import { TareaYAlumnoNombre } from './model/tareaYAlumnoNombre'
import { Proyecto } from '../proyectos/model/proyecto';
import { TareasProfesor } from './model/tareasProfesor';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private http: HttpClient) { }

  addTareaSinAlumno(tarea: TareaYAlumno): Observable<Tareas> {
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
  listadoTareasSinAsignar(): Observable<TareaYAlumno[]> {
    return this.http.get<TareaYAlumno[]>(environment.apiUrl + '/tareas/listado/asignacion/' + sessionStorage.getItem('loginId'))
  }
  listadoTareasConAsignacion(): Observable<TareaYAlumnoNombre[]> {
    const tutorId = sessionStorage.getItem('loginId')
    return this.http.get<TareaYAlumnoNombre[]>(environment.apiUrl + '/tareas/puntuar/' + tutorId)
  }
  listadoNotasPorTutorEmpresaId(): Observable<TareaYAlumnoNombre[]> {
    const tutorId = sessionStorage.getItem('loginId')
    return this.http.get<TareaYAlumnoNombre[]>(environment.apiUrl + '/tareas/listado/notasPorTutorEmpresa/' + tutorId)
  }

  listadoTareasPorProfesor(): Observable<TareasProfesor[]> {
    return this.http.get<TareasProfesor[]>(environment.apiUrl + '/tareas/listado/tareasPorProfesor/'
      + sessionStorage.getItem('loginId'))
  }

}
