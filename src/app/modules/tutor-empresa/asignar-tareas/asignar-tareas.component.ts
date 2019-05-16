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
  selector: 'app-asignar-tareas',
  templateUrl: './asignar-tareas.component.html',
  styleUrls: ['./asignar-tareas.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class AsignarTareaDialog implements OnInit {
  alumnos: Alumno[]
  tareas: Tareas[] = []
  tarea: Tareas = new Tareas
  tareasModificadas: TareaYAlumno[] = []
  codigoAlumno: string = null

  constructor(
    public dialogRef: MatDialogRef<AsignarTareaDialog>,
    public alumnosService: AlumnoService,
    public tareasService: TareasService,
    public snackBar: MatSnackBar,
    private crearTareaDialog: CrearTareaComponent) { }
  ngOnInit() {
    // tslint:disable-next-line:radix
    const tutorId = parseInt(sessionStorage.getItem('loginId'))
    this.tareasService.listadoTareasSinAsignar().subscribe(data => {
      this.tareas = data
      this.alumnosService.listadoPorTutor(tutorId).subscribe(alumnos => {
        this.alumnos = alumnos
      })
    })
  }
  onNoClick(): void {
    this.dialogRef.close()
  }

  selectAlumno(codigoAlumno, tarea: Tareas) {
    if (codigoAlumno !== 'null') {
      const modTarea: TareaYAlumno = new TareaYAlumno
      modTarea.idTarea = tarea.id
      modTarea.codigoTarea = tarea.codigoTarea
      modTarea.descripcion = tarea.descripcion
      modTarea.codigoAlumno = codigoAlumno
      this.tareasModificadas = this.tareasModificadas.filter(x => x.codigoTarea !== tarea.codigoTarea)
      this.tareasModificadas.push(modTarea)
    } else {
      this.tareasModificadas = this.tareasModificadas.filter(x => x.codigoTarea !== tarea.codigoTarea)
    }
  }

  guardar() {
    this.tareasService.asignacionTareasListado(this.tareasModificadas).subscribe(
      data => {
        if (this.tareasModificadas.length > 1) {
          this.snackBar.open('CORRECTO', 'Tareas asignadas con éxito', { duration: 8000, verticalPosition: 'top' })
        } else if (this.tareasModificadas.length === 1) {

          this.snackBar.open('CORRECTO', 'Tarea asignada con éxito', { duration: 8000, verticalPosition: 'top' })
        }
        this.onNoClick()
      },
      error => this.snackBar.open('ERROR', 'Error al asignar las tareas', { duration: 8000, verticalPosition: 'top' })
    )
  }
  crearTareas() {
    this.onNoClick()
    this.crearTareaDialog.open().subscribe(result => {
    })
  }
}
@Component({
  selector: 'app-asignar-tareas',
  template: ''
})
export class AsignarTareasComponent {
  anyo: number
  constructor(public dialog: MatDialog) { }

  public open(): Observable<any> {
    const dialogRef = this.dialog.open(AsignarTareaDialog, {
      width: '700px',
      height: '600px',
      maxHeight: '100vh'
    })
    return dialogRef.afterClosed()
  }

}
