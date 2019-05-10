import { Component, OnInit } from '@angular/core';
import { CrearTareaComponent } from '../crear-tarea/crear-tarea.component';
import { AsignarTareasComponent } from '../asignar-tareas/asignar-tareas.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private crearTareaDialog: CrearTareaComponent,
    private asginarTareaDialog: AsignarTareasComponent) { }

  ngOnInit() {
    console.log('HOME')
  }
  crearTarea() {
    this.crearTareaDialog.open().subscribe(result => {
    })
  }
  asignarTareas() {
    this.asginarTareaDialog.open().subscribe(result => {
    })
  }

}
