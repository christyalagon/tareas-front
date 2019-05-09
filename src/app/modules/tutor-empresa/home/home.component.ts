import { Component, OnInit } from '@angular/core';
import { CrearTareaComponent } from '../crear-tarea/crear-tarea.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private crearTareaDialog: CrearTareaComponent) { }

  ngOnInit() {
    console.log('HOME');
  }
  crearTarea() {
    this.crearTareaDialog.open().subscribe(result => {
      if (result) {
        console.log(result)
      }
    })
  }

}
