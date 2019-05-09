import { Component, OnInit, Inject } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Observable } from 'rxjs'
import { AlumnoService } from 'src/app/services/alumnos/alumno.service'
import { Alumno } from 'src/app/services/alumnos/model/alumno'
import { log } from 'util'
import { TareasService } from 'src/app/services/tareas/tareas.service'
import { Tareas } from 'src/app/services/tareas/model/tareas'
import { TareaYAlumno } from 'src/app/services/tareas/model/tareaYAlumno';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class CrearTareaDialog implements OnInit {
  alumnos: Alumno[]
  tarea: Tareas = new Tareas
  codigoAlumno: string = null
  tareaForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<CrearTareaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public alumnosService: AlumnoService,
    public tareasService: TareasService,
    private formBuilder: FormBuilder) { }
  ngOnInit() {
    // tslint:disable-next-line:radix
    const tutorId = parseInt(sessionStorage.getItem('loginId'))
    this.createFormGroup()
    this.alumnosService.listadoPorTutor(tutorId).subscribe(data => {
      this.alumnos = data
      console.log(this.alumnos)
    })
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
  createFormGroup() {
    this.tareaForm = this.formBuilder.group({
      CodigoTarea: [this.tarea.codigoTarea, Validators.required],
      Descripcion: [this.tarea.descripcion, Validators.required],
      CodigoAlumno: [this.codigoAlumno]
    })
  }

  get fControls() { return this.tareaForm.controls }

  guardado(cerrar?: boolean) {
    if (!this.tareaForm.invalid) {

      if (this.codigoAlumno == null) {
        console.log(this.tarea)
        let tareaNueva: Tareas
        tareaNueva = JSON.parse(JSON.stringify(this.tareaForm.getRawValue()))
        this.tareasService.addTareaSinAlumno(tareaNueva).subscribe(data => {
          if (cerrar) {
            this.dialogRef.close()
          } else {
            this.tarea = new Tareas
            this.codigoAlumno = null
          }
        }, error => {
          console.log(error)
        })

      } else {
        let tareaNueva: TareaYAlumno
        tareaNueva = JSON.parse(JSON.stringify(this.tareaForm.getRawValue()))
        this.tareasService.addTareaConAlumno(tareaNueva).subscribe(data => {
          if (cerrar) {
            this.dialogRef.close()
          }
        }, error => {
          console.log(error)
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
      width: '700px'
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
