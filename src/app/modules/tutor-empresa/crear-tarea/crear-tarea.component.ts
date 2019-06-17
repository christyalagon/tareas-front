import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material'
import { Observable } from 'rxjs'
import { AlumnoService } from 'src/app/services/alumnos/alumno.service'
import { Alumno } from 'src/app/services/alumnos/model/alumno'
import { log } from 'util'
import { TareasService } from 'src/app/services/tareas/tareas.service'
import { Tareas } from 'src/app/services/tareas/model/tareas'
import { TareaYAlumno } from 'src/app/services/tareas/model/tareaYAlumno'
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms'
import { Proyecto } from 'src/app/services/proyectos/model/proyecto'
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service'

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class CrearTareaDialog implements OnInit {
  @ViewChild('proyectosPaginator') paginator: MatPaginator
  alumnos: Alumno[]
  tarea: Tareas = new Tareas
  codigoAlumno: string = null
  tareaForm: FormGroup
  cerrar: Boolean = false
  nombreProyectoSeleccionado: string

  displayedColumns: string[] = ['Nombre', 'Descripcion']
  dataSource = new MatTableDataSource()
  crearTarea: Boolean = false
  proyectos: Proyecto[]
  constructor(
    public dialogRef: MatDialogRef<CrearTareaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public alumnosService: AlumnoService,
    public tareasService: TareasService,
    public proyectoService: ProyectosService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar) { }
  ngOnInit() {
    // tslint:disable-next-line:radix
    const tutorId = parseInt(sessionStorage.getItem('loginId'))
    this.createFormGroup()
    this.proyectoService.listarPorTutor().subscribe(
      data => {
        this.proyectos = data
        this.dataSource = new MatTableDataSource(this.proyectos)
        this.dataSource.paginator = this.paginator
        this.alumnosService.listadoPorTutor(tutorId).subscribe(data2 => {
          this.alumnos = data2
        })
      }
    )
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
  createFormGroup() {
    this.tareaForm = this.formBuilder.group({
      CodigoTarea: [this.tarea.codigoTarea, [Validators.required, Validators.maxLength(3)]],
      Descripcion: [this.tarea.descripcion, [Validators.required, Validators.maxLength(80)]],
      CodigoAlumno: [this.codigoAlumno]
    })
  }

  pasarACrearTarea(proyecto: Proyecto) {
    this.nombreProyectoSeleccionado = proyecto.nombre
    this.crearTarea = true
  }

  submitForm(formData: any, formDirective: FormGroupDirective, cerrar?: boolean) {
    console.log('cerrar')
    console.log(cerrar)
    if (!this.tareaForm.invalid) {
      if (this.tareaForm.value.CodigoAlumno == null) {
        const tareaNueva: TareaYAlumno = new TareaYAlumno
        tareaNueva.codigoTarea = this.tareaForm.value.CodigoTarea
        tareaNueva.descripcion = this.tareaForm.value.Descripcion
        tareaNueva.nombreProyecto = this.nombreProyectoSeleccionado
        this.tareasService.addTareaSinAlumno(tareaNueva).subscribe(data => {
          this.snackBar.open('CORRECTO', 'Tarea creada con éxito', { duration: 8000, verticalPosition: 'top' })
          if (cerrar) {
            this.dialogRef.close()
          } else {
            this.tarea = new Tareas
            this.codigoAlumno = null
            formDirective.resetForm()
            this.tareaForm.reset()
            this.createFormGroup()
          }
        }, error => {
          this.snackBar.open('ERROR', 'Error al guardar la tarea', { duration: 8000, verticalPosition: 'top' })
        })

      } else {
        const tareaNueva: TareaYAlumno = new TareaYAlumno
        tareaNueva.codigoTarea = this.tareaForm.value.CodigoTarea
        tareaNueva.descripcion = this.tareaForm.value.Descripcion
        tareaNueva.codigoAlumno = this.tareaForm.value.CodigoAlumno
        tareaNueva.nombreProyecto = this.nombreProyectoSeleccionado
        this.tareasService.addTareaConAlumno(tareaNueva).subscribe(data => {
          this.snackBar.open('CORRECTO', 'Tarea creada con éxito', { duration: 8000, verticalPosition: 'top' })
          if (cerrar) {
            this.dialogRef.close()
          } else {
            this.tarea = new Tareas
            this.codigoAlumno = null
            formDirective.resetForm()
            this.tareaForm.reset()
            this.createFormGroup()
          }
        }, error => {
          this.snackBar.open('ERROR', 'Error al guardar la tarea', { duration: 8000, verticalPosition: 'top' })
        })

      }
    }
  }
}
@Component({
  selector: 'app-crear-tarea',
  template: ''
})
export class CrearTareaComponent {
  anyo: number
  constructor(public dialog: MatDialog) { }

  public open(): Observable<any> {
    const parametro = false
    const dialogRef = this.dialog.open(CrearTareaDialog, {
      width: '900px',
      maxHeight: '100vh',
    })
    return dialogRef.afterClosed()
  }

  public openWithParam(title: string, message: string): Observable<any> {
    const parametro = true
    const anyo = new Date().getFullYear()

    const dialogRef = this.dialog.open(CrearTareaDialog, {
      width: '500px',
      data: { title, message, parametro, anyo }
    })
    return dialogRef.afterClosed()
  }

}
