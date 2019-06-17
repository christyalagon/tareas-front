import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef, MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material'
import { Observable } from 'rxjs'
import { TareasService } from 'src/app/services/tareas/tareas.service'
import { TareasProfesor } from 'src/app/services/tareas/model/tareasProfesor'


@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.component.html',
  styleUrls: ['./listar-tareas.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ListarTareasDialog implements OnInit {
  @ViewChild('tareasPaginator') paginator: MatPaginator
  savePaginator: MatPaginator
  displayedColumns: string[] = ['Proyecto', 'Codigo', 'Descripcion', 'Nota', 'Alumno']
  dataSource = new MatTableDataSource()
  tareas: TareasProfesor[]
  tareasTemp: TareasProfesor[]
  alumnos: String[] = []
  proyectos: String[] = []
  filtroNotas: Boolean = false
  alumnoFiltro: string
  constructor(
    public dialogRef: MatDialogRef<ListarTareasDialog>,
    public tareasService: TareasService,
    public snackBar: MatSnackBar) { }
  ngOnInit() {
    this.tareasService.listadoTareasPorProfesor().subscribe(
      data => {
        this.tareas = data
        this.dataSource = new MatTableDataSource(this.tareas)
        this.dataSource.paginator = this.paginator
        this.savePaginator = this.paginator
        this.tareas.forEach(tarea => {
          console.log(tarea.nombreAlumno + ' ' + tarea.apellidoAlumno)
          if (!this.alumnos.includes(tarea.nombreAlumno + ' ' + tarea.apellidoAlumno)) {
            this.alumnos.push(tarea.nombreAlumno + ' ' + tarea.apellidoAlumno)
          }
          if (!this.proyectos.includes(tarea.nombreProyecto)) {
            this.proyectos.push(tarea.nombreProyecto)
          }
        })
      }
    )
  }
  onNoClick(): void {
    this.dialogRef.close()
  }

  tareasPuntuadas() {
    this.tareasTemp = this.tareas.filter(tarea => tarea.nota != null)
    if (this.alumnoFiltro != null) {
      this.tareasTemp = this.tareasTemp.filter(tarea => tarea.nombreAlumno + ' ' + tarea.apellidoAlumno === this.alumnoFiltro)
    }
    this.dataSource = new MatTableDataSource(this.tareasTemp)
    this.dataSource.paginator = this.paginator
    this.filtroNotas = true
  }
  resetFilter() {
    this.dataSource = new MatTableDataSource(this.tareas)
    this.dataSource.paginator = this.paginator
    this.filtroNotas = false
    this.alumnoFiltro = null
  }

  filtrarAlumno() {
    if (this.alumnoFiltro != null) {
      this.tareasTemp = this.tareas.filter(tarea => tarea.nombreAlumno + ' ' + tarea.apellidoAlumno === this.alumnoFiltro)
      if (this.filtroNotas) {
        this.tareasTemp = this.tareasTemp.filter(tarea => tarea.nota != null)
      }
      this.dataSource = new MatTableDataSource(this.tareasTemp)
      this.dataSource.paginator = this.paginator

    } else {
      this.dataSource = new MatTableDataSource(this.tareas)
      this.dataSource.paginator = this.paginator
    }
  }

}
@Component({
  selector: 'app-listar-tareas',
  template: ''
})

export class ListarTareasComponent {
  constructor(public dialog: MatDialog) { }

  public open(): Observable<any> {
    const dialogRef = this.dialog.open(ListarTareasDialog, {
      width: '900px',
      height: '700px',
      maxHeight: '100vh'
    })
    return dialogRef.afterClosed()
  }

}
