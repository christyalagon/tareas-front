import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { UsuarioFusion } from './model/UsuarioFusion'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }
  usuariosFusionados(): Observable<UsuarioFusion[]> {
    return this.http.get<UsuarioFusion[]>(environment.apiUrl + '/usuarios/listarTodos')
  }
}
