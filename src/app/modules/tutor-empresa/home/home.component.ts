import { Component, OnInit } from '@angular/core'
import { CrearTareaComponent } from '../crear-tarea/crear-tarea.component'
import { AsignarTareasComponent } from '../asignar-tareas/asignar-tareas.component'
import { PuntuarTareasComponent } from '../puntuar-tareas/puntuar-tareas.component'
import { ListarNotasComponent } from '../listar-notas/listar-notas.component'
import { CrearProyectoComponent } from '../crear-proyecto/crear-proyecto.component'
import { ListarProyectosComponent } from '../listar-proyectos/listar-proyectos.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private crearTareaDialog: CrearTareaComponent,
    private asginarTareaDialog: AsignarTareasComponent,
    private puntuarDialog: PuntuarTareasComponent,
    private listarDialog: ListarNotasComponent,
    private listarProyectosDialog: ListarProyectosComponent,
    private crearProyectoDialog: CrearProyectoComponent) { }

  ngOnInit() {
  }
  crearProyecto() {
    this.crearProyectoDialog.open().subscribe(result => {
    })
  }
  crearTarea() {
    this.crearTareaDialog.open().subscribe(result => {
    })
  }
  asignarTareas() {
    this.asginarTareaDialog.open().subscribe(result => {
    })
  }
  puntuarTareas() {
    this.puntuarDialog.open().subscribe(result => {
    })
  }
  listarNotas() {
    this.listarDialog.open().subscribe(result => {
    })
  }
  listarProyectos() {
    this.listarProyectosDialog.open().subscribe(result => {
    })
  }

}
