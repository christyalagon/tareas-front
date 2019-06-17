import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource, MatPaginator, Sort } from '@angular/material'
import { Observable } from 'rxjs'
import { AlumnoService } from 'src/app/services/alumnos/alumno.service'
import { Alumno } from 'src/app/services/alumnos/model/alumno'
import { TareasService } from 'src/app/services/tareas/tareas.service'
import { Tareas } from 'src/app/services/tareas/model/tareas'
import { TareaYAlumno } from 'src/app/services/tareas/model/tareaYAlumno'
import { TareaYAlumnoNombre } from 'src/app/services/tareas/model/tareaYAlumnoNombre'

@Component({
  selector: 'app-puntuar-tareas',
  templateUrl: './puntuar-tareas.component.html',
  styleUrls: ['./puntuar-tareas.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class PuntuarTareaDialog implements OnInit {
  alumnos: Alumno[]
  tareas: Tareas[]
  tarea: Tareas = new Tareas
  tareasConAlumno: TareaYAlumnoNombre[] = []
  tareasModificadas: TareaYAlumnoNombre[] = []
  codigoAlumno: string = null

  constructor(
    public dialogRef: MatDialogRef<PuntuarTareaDialog>,
    public alumnosService: AlumnoService,
    public tareasService: TareasService,
    public snackBar: MatSnackBar) { }
  ngOnInit() {
    // tslint:disable-next-line:radix
    const tutorId = parseInt(sessionStorage.getItem('loginId'))
    this.tareasService.listadoTareasConAsignacion().subscribe(data => {
      this.tareasConAlumno = data
    })
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
  valorar(tarea: TareaYAlumnoNombre) {
    console.log(tarea.nota)
    if (tarea.nota > 10) {
      tarea.nota = 10
    } else if (tarea.nota < 0) {
      tarea.nota = 0
    } else if (tarea.nota == null) {
      tarea.nota = 0
    }
  }

  guardar() {
    this.tareasConAlumno.forEach(tarea => {
      if (tarea.nota != null) {
        this.tareasModificadas.push(tarea)
      }
    })
    this.tareasService.puntuarTareas(this.tareasModificadas).subscribe(
      data => {
        if (this.tareasModificadas.length > 1) {
          this.snackBar.open('CORRECTO', 'Tareas puntuadas con éxito', { duration: 8000, verticalPosition: 'top' })
        } else if (this.tareasModificadas.length === 1) {

          this.snackBar.open('CORRECTO', 'Tarea puntuada con éxito', { duration: 8000, verticalPosition: 'top' })
        }
        this.onNoClick()
      }
    )
  }

}
@Component({
  selector: 'app-puntuar-tareas',
  template: ''
})
export class PuntuarTareasComponent {
  anyo: number
  constructor(public dialog: MatDialog) { }

  public open(): Observable<any> {
    const dialogRef = this.dialog.open(PuntuarTareaDialog, {
      width: '900px',
      height: '600px',
      maxHeight: '100vh'
    })
    return dialogRef.afterClosed()
  }

}

