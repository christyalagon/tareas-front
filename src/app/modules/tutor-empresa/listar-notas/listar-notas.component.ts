import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material'
import { Observable } from 'rxjs'
import { AlumnoService } from 'src/app/services/alumnos/alumno.service'
import { Alumno } from 'src/app/services/alumnos/model/alumno'
import { TareasService } from 'src/app/services/tareas/tareas.service'
import { Tareas } from 'src/app/services/tareas/model/tareas'
import { TareaYAlumno } from 'src/app/services/tareas/model/tareaYAlumno'
import { CrearTareaComponent } from '../crear-tarea/crear-tarea.component'


@Component({
  selector: 'app-listar-notas',
  templateUrl: './listar-notas.component.html',
  styleUrls: ['./listar-notas.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ListarNotasDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ListarNotasDialog>,
    public alumnosService: AlumnoService,
    public tareasService: TareasService,
    public snackBar: MatSnackBar,
    private crearTareaDialog: CrearTareaComponent) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close()
  }

}
@Component({
  selector: 'app-listar-notas',
  template: ''
})

export class ListarNotasComponent {
  anyo: number
  constructor(public dialog: MatDialog) { }

  public open(): Observable<any> {
    const dialogRef = this.dialog.open(ListarNotasDialog, {
      width: '900px',
      height: '600px',
      maxHeight: '100vh'
    })
    return dialogRef.afterClosed()
  }

}
