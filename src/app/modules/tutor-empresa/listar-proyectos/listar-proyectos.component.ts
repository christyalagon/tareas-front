import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef, MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material'
import { Observable } from 'rxjs'
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service'
import { ProyectoYTareas } from 'src/app/services/proyectos/model/proyectoYTareas'


@Component({
  selector: 'app-proyectos-notas',
  templateUrl: './listar-proyectos.component.html',
  styleUrls: ['./listar-proyectos.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class ListarProyectosDialog implements OnInit {
  @ViewChild('proyectosPaginator') paginator: MatPaginator
  @ViewChild('tareasPaginator') paginator2: MatPaginator
  savePaginator: MatPaginator
  displayedColumns: string[] = ['Nombre', 'Descripcion']
  displayedColumns2: string[] = ['Codigo', 'Descripcion', 'Nombre', 'Nota']
  dataSource = new MatTableDataSource()
  dataSource2 = new MatTableDataSource()
  proyectos: ProyectoYTareas[]

  mostrarDetalle: Boolean = false
  proyectoDetalle: ProyectoYTareas

  constructor(
    public dialogRef: MatDialogRef<ListarProyectosDialog>,
    public proyectoService: ProyectosService,
    public snackBar: MatSnackBar) { }
  ngOnInit() {
    this.proyectoService.listarProyectos().subscribe(
      data => {
        this.proyectos = data
        this.dataSource = new MatTableDataSource(this.proyectos)
        this.dataSource.paginator = this.paginator
        this.savePaginator = this.paginator
      }
    )
  }
  onNoClick(): void {
    this.dialogRef.close()
  }

  mostrarVistaDetalle(proyecto: ProyectoYTareas) {
    this.mostrarDetalle = true
    this.proyectoDetalle = proyecto
    setTimeout(() => {
      this.dataSource2 = new MatTableDataSource(this.proyectoDetalle.tareas)
      this.dataSource2.paginator = this.paginator2
    }, 100)
  }

  volverListado() {
    this.proyectoDetalle = null
    this.mostrarDetalle = false
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.proyectos)
      this.dataSource.paginator = this.paginator
    }, 100)
  }

}
@Component({
  selector: 'app-listar-notas',
  template: ''
})

export class ListarProyectosComponent {
  constructor(public dialog: MatDialog) { }

  public open(): Observable<any> {
    const dialogRef = this.dialog.open(ListarProyectosDialog, {
      width: '900px',
      height: '700px',
      maxHeight: '100vh'
    })
    return dialogRef.afterClosed()
  }

}
