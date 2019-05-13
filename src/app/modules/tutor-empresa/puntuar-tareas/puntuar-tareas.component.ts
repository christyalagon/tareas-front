import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource, MatPaginator, Sort } from '@angular/material'
import { Observable } from 'rxjs'
import { AlumnoService } from 'src/app/services/alumnos/alumno.service'
import { Alumno } from 'src/app/services/alumnos/model/alumno'
import { TareasService } from 'src/app/services/tareas/tareas.service'
import { Tareas } from 'src/app/services/tareas/model/tareas'
import { TareaYAlumno } from 'src/app/services/tareas/model/tareaYAlumno'

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
  tareasModificadas: TareaYAlumno[] = []
  codigoAlumno: string = null

  constructor(
    public dialogRef: MatDialogRef<PuntuarTareaDialog>,
    public alumnosService: AlumnoService,
    public tareasService: TareasService,
    public snackBar: MatSnackBar) { }
  ngOnInit() {
    // tslint:disable-next-line:radix
    const tutorId = parseInt(sessionStorage.getItem('loginId'))
    this.tareasService.listadoTareasSinAsignar().subscribe(data => {
      this.tareas = data
      this.alumnosService.listadoPorTutor(tutorId).subscribe(alumnos => {
        this.alumnos = alumnos
        console.log(this.alumnos)
      })
    })
  }
  onNoClick(): void {
    this.dialogRef.close()
  }

  sortTable(sort: Sort) {
    this.tareas = this.tareas.sort((t1, t2) => {
      const isAsc = sort.direction === 'asc'
      switch (sort.active) {
        case 'codigo': {
          return this.compare(t1.codigoTarea, t2.codigoTarea, isAsc)
        }
        case 'descripcion': {
          return this.compare(t1.descripcion, t2.descripcion, isAsc)
        }
      }
    })
    this.dataSource = new MatTableDataSource(this.tareas)
    this.dataSource.paginator = this.paginator
  }
  compare(is1: number | string | Date, is2: number | string | Date, isAsc: boolean) {
    return (is1 < is2 ? -1 : 1) * (isAsc ? 1 : -1)
  }
  puntuarTarea(codigoAlumno, tarea: Tareas) {
    console.log(codigoAlumno)
    if (codigoAlumno !== 'null') {
      console.log('codigoAlumno')
      const modTarea: TareaYAlumno = new TareaYAlumno
      modTarea.idTarea = tarea.id
      modTarea.codigoTarea = tarea.codigoTarea
      modTarea.descripcion = tarea.descripcion
      modTarea.codigoAlumno = codigoAlumno
      this.tareasModificadas = this.tareasModificadas.filter(x => x.codigoTarea !== tarea.codigoTarea)
      this.tareasModificadas.push(modTarea)
    } else {
      console.log('borrado')
      this.tareasModificadas = this.tareasModificadas.filter(x => x.codigoTarea !== tarea.codigoTarea)
    }
  }

  guardar() {
    console.log(this.tareasModificadas)
    this.tareasService.asignacionTareasListado(this.tareasModificadas).subscribe()
    this.onNoClick()
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
      width: '700px',
      height: '600px'
    })
    return dialogRef.afterClosed()
  }

}

