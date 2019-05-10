import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource, MatPaginator, Sort } from '@angular/material'
import { Observable } from 'rxjs'
import { AlumnoService } from 'src/app/services/alumnos/alumno.service'
import { Alumno } from 'src/app/services/alumnos/model/alumno'
import { log } from 'util'
import { TareasService } from 'src/app/services/tareas/tareas.service'
import { Tareas } from 'src/app/services/tareas/model/tareas'
import { TareaYAlumno } from 'src/app/services/tareas/model/tareaYAlumno'
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms'

@Component({
  selector: 'app-asignar-tareas',
  templateUrl: './asignar-tareas.component.html',
  styleUrls: ['./asignar-tareas.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class AsignarTareaDialog implements OnInit {
  alumnos: Alumno[]
  tareas: Tareas[]
  tarea: Tareas = new Tareas
  codigoAlumno: string = null
  @ViewChild('paginator') paginator: MatPaginator

  displayedColumns: string[] = ['Codigo', 'Descripcion']
  dataSource = new MatTableDataSource()

  constructor(
    public dialogRef: MatDialogRef<AsignarTareaDialog>,
    public alumnosService: AlumnoService,
    public tareasService: TareasService,
    public snackBar: MatSnackBar) { }
  ngOnInit() {
    // tslint:disable-next-line:radix
    const tutorId = parseInt(sessionStorage.getItem('loginId'))
    this.tareasService.listadoTareasSinAsignar().subscribe(data => {
      this.tareas = data
      this.dataSource = new MatTableDataSource(this.tareas)
      this.dataSource.paginator = this.paginator
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
}
@Component({
  selector: 'app-asignar-tareas',
  template: ''
})
export class AsignarTareasComponent {
  anyo: number
  constructor(public dialog: MatDialog) { }

  public open(): Observable<any> {
    const parametro = false
    const dialogRef = this.dialog.open(AsignarTareaDialog, {
      width: '700px',
      height: '700px'
    })
    return dialogRef.afterClosed()
  }

}
