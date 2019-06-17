import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material'
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms'
import { Proyecto } from 'src/app/services/proyectos/model/proyecto'
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service'

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class CrearProyectoDialog implements OnInit {
  proyecto: Proyecto = new Proyecto
  proyectoForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<CrearProyectoDialog>,
    public proyectosService: ProyectosService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar) { }
  ngOnInit() {
    // tslint:disable-next-line:radix
    const tutorId = parseInt(sessionStorage.getItem('loginId'))
    this.createFormGroup()

  }
  onNoClick(): void {
    console.log('close')
    this.dialogRef.close()
  }
  createFormGroup() {
    this.proyectoForm = this.formBuilder.group({
      Nombre: [this.proyecto.nombre, [Validators.required, Validators.maxLength(30)]],
      Descripcion: [this.proyecto.descripcion, [Validators.required, Validators.maxLength(80)]]
    })
  }

  submitForm(formData: any, formDirective: FormGroupDirective) {
    if (!this.proyectoForm.invalid) {
      const proyecto: Proyecto = new Proyecto
      proyecto.nombre = this.proyectoForm.value.Nombre
      proyecto.descripcion = this.proyectoForm.value.Descripcion
      this.proyectosService.crearProyecto(proyecto).subscribe(data => {
        this.snackBar.open('CORRECTO', 'Proyecto creado con éxito', { duration: 8000, verticalPosition: 'top' })
        this.dialogRef.close()
      }, error => {
        this.snackBar.open('ERROR', 'Error al guardar el proyecto', { duration: 8000, verticalPosition: 'top' })
      })
    }
  }
}
@Component({
  selector: 'app-crear-proyecto',
  template: ''
})
export class CrearProyectoComponent {
  anyo: number
  constructor(public dialog: MatDialog) { }

  public open(): Observable<any> {
    const parametro = false
    const dialogRef = this.dialog.open(CrearProyectoDialog, {
      width: '900px',
      maxHeight: '100vh',
    })
    return dialogRef.afterClosed()
  }

}
