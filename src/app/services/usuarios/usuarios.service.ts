import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { UsuarioFusion } from './model/UsuarioFusion'
import { environment } from 'src/environments/environment'
import { Usuario } from './model/Usuario'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }
  usuariosFusionados(): Observable<UsuarioFusion[]> {
    return this.http.get<UsuarioFusion[]>(environment.apiUrl + '/usuarios/listar/todos')
  }

  profesores(): Observable<UsuarioFusion[]> {
    return this.http.get<UsuarioFusion[]>(environment.apiUrl + '/usuarios/listar/profesores')
  }

  tutoresEmpresa(): Observable<UsuarioFusion[]> {
    return this.http.get<UsuarioFusion[]>(environment.apiUrl + '/usuarios/listar/empresa')
  }
  guardarUsuario(usuario: UsuarioFusion): Observable<UsuarioFusion> {
    return this.http.post<UsuarioFusion>(environment.apiUrl + '/usuarios/guardar', usuario)
  }
}
