import { Component, OnInit } from '@angular/core'
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service'
import { CrearAlumnosComponent } from '../crear-alumnos/crear-alumnos.component'
import { AdminUsuariosComponent } from '../admin-usuarios/admin-usuarios.component'

@Component({
  selector: 'app-tutor-centro',
  templateUrl: './tutor-centro.component.html',
  styleUrls: ['./tutor-centro.component.scss']
})
export class TutorCentroComponent implements OnInit {

  constructor(private usuarioService: UsuariosService,
    private crearAlumDialog: CrearAlumnosComponent,
    private adminUsersDialog: AdminUsuariosComponent) { }

  ngOnInit() {
  }

  crearAlumnos() {
    this.crearAlumDialog.open().subscribe(result => {
    })
  }
  adminUsers() {
    this.adminUsersDialog.open().subscribe(result => {
    })
  }

}
