import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Proyecto } from './model/proyecto'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { ProyectoYTareas } from './model/proyectoYTareas';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http: HttpClient) { }

  crearProyecto(proyecto: Proyecto): Observable<Proyecto> {
    proyecto.tutorId = sessionStorage.getItem('loginId')
    return this.http.post<Proyecto>(environment.apiUrl + '/proyecto/nuevo', proyecto)
  }

  listarPorTutor(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(environment.apiUrl + '/proyecto/listar/tutor/' + sessionStorage.getItem('loginId'))
  }
  listarProyectos(): Observable<ProyectoYTareas[]> {
    return this.http.get<ProyectoYTareas[]>(environment.apiUrl + '/proyecto/listar/proyecto-tareas/' + sessionStorage.getItem('loginId'))
  }
}
