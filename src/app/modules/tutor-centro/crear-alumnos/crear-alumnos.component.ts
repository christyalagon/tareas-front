import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material'
import { Observable } from 'rxjs'
import { AlumnoService } from 'src/app/services/alumnos/alumno.service'
import { Alumno } from 'src/app/services/alumnos/model/alumno'
import { TareasService } from 'src/app/services/tareas/tareas.service'
import { Tareas } from 'src/app/services/tareas/model/tareas'
import { TareaYAlumno } from 'src/app/services/tareas/model/tareaYAlumno'
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms'
import { Usuario } from 'src/app/services/usuarios/model/Usuario'
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service'
import { UsuarioFusion } from 'src/app/services/usuarios/model/UsuarioFusion'
import { NuevoAlumno } from 'src/app/services/alumnos/model/nuevoAlumno'

@Component({
  selector: 'app-crear-alumnos',
  templateUrl: './crear-alumnos.component.html',
  styleUrls: ['./crear-alumnos.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class CrearAlumnosDialog implements OnInit {
  alumnoForm: FormGroup
  alumno: Alumno = new Alumno
  profesorId: number
  cerrar: Boolean = false

  profesores: UsuarioFusion[] = []
  tutoresEmpresa: UsuarioFusion[] = []

  constructor(
    public dialogRef: MatDialogRef<CrearAlumnosDialog>,
    public userService: UsuariosService,
    public alumnosService: AlumnoService,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.createFormGroup()
    this.userService.profesores().subscribe(
      data => {
        this.profesores = data
        console.log(data)
        this.userService.tutoresEmpresa().subscribe(
          data2 => {
            this.tutoresEmpresa = data2
            console.log(data2)
          },
          error => console.log('error')
        )
      },
      error => { console.log('error') }
    )
  }
  onNoClick(): void {
    this.dialogRef.close()
  }

  createFormGroup() {
    this.alumnoForm = this.formBuilder.group({
      Codigo: [this.alumno.codigoAlumno, [Validators.required]],
      Nombre: [this.alumno.nombre, [Validators.required]],
      PrimerApellido: [this.alumno.primerApellido, [Validators.required]],
      SegundoApellido: [this.alumno.segundoApellido, [Validators.required]],
      TutorEmpresaId: [this.alumno.tutorId, [Validators.required]],
      ProfesorId: [this.profesorId, [Validators.required]]
    })
  }

  submitForm(formData: any, formDirective: FormGroupDirective, cerrar?: boolean) {
    if (!this.alumnoForm.invalid) {
      const nuevoAlumno: NuevoAlumno = new NuevoAlumno
      nuevoAlumno.codigoAlumno = this.alumnoForm.value.Codigo
      nuevoAlumno.nombre = this.alumnoForm.value.Nombre
      nuevoAlumno.primerApellido = this.alumnoForm.value.PrimerApellido
      nuevoAlumno.segundoApellido = this.alumnoForm.value.SegundoApellido
      nuevoAlumno.tutorId = this.alumnoForm.value.TutorEmpresaId
      nuevoAlumno.profesorId = this.alumnoForm.value.ProfesorId
      this.alumnosService.nuevoAlumno(nuevoAlumno).subscribe(
        data => {
          this.snackBar.open('CORRECTO', 'Alumno creado con éxito', { duration: 8000, verticalPosition: 'top' })
          if (cerrar) {
            this.dialogRef.close()
          } else {
            this.alumno = new Alumno
            this.profesorId = null
            formDirective.resetForm()
            this.alumnoForm.reset()
            this.createFormGroup()
          }
        }
      )
    }
  }
}
@Component({
  selector: 'app-crear-alumnos',
  template: ''
})

export class CrearAlumnosComponent {
  constructor(public dialog: MatDialog) { }

  public open(): Observable<any> {
    const dialogRef = this.dialog.open(CrearAlumnosDialog, {
      width: '700px',
      height: '600px',
      maxHeight: '100vh'
    })
    return dialogRef.afterClosed()
  }

}

