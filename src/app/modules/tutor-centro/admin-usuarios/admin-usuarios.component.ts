import { Component, OnInit, ViewChild, OnChanges } from '@angular/core'
import { MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource, MatPaginator, Sort } from '@angular/material'
import { Observable } from 'rxjs'
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms'
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service'
import { UsuarioFusion } from 'src/app/services/usuarios/model/UsuarioFusion'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class AdministrarUsuariosDialog implements OnInit, OnChanges {
  @ViewChild('usersPaginator') paginator: MatPaginator
  savePaginator: MatPaginator
  usuarioForm: FormGroup
  cerrar: Boolean = false
  usuarios: UsuarioFusion[] = []
  usuarioEdit: UsuarioFusion
  editar: Boolean = false
  displayedColumns: string[] = ['Nombre', 'Rol', 'Grupo']
  dataSource = new MatTableDataSource()

  constructor(
    public dialogRef: MatDialogRef<AdministrarUsuariosDialog>,
    public userService: UsuariosService,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.userService.usuariosFusionados().subscribe(
      data => {
        this.usuarios = data
        this.dataSource = new MatTableDataSource(this.usuarios)
        this.dataSource.paginator = this.paginator
        this.savePaginator = this.paginator
      },
      error => {
        this.snackBar.open('ERROR', 'Error al encontrar los usuarios', { duration: 8000, verticalPosition: 'top' })
      }
    )
  }
  ngOnChanges() {
    this.dataSource.paginator = this.paginator
  }
  onNoClick(): void {
    this.dialogRef.close()
  }

  createFormGroup() {
    this.usuarioForm = this.formBuilder.group({
      id: [this.usuarioEdit.id],
      nombre: [this.usuarioEdit.nombre, [Validators.required]],
      primerApellido: [this.usuarioEdit.primerApellido, [Validators.required]],
      segundoApellido: [this.usuarioEdit.segundoApellido, [Validators.required]],
      centroEmpresa: [this.usuarioEdit.centroEmpresa, [Validators.required]],
      perfil: [this.usuarioEdit.perfil],
    })
  }
  getRol(rol: string) {
    return rol === environment.empresaPerfil ? 'Tutor empresa' : 'Profesor'
  }
  submitForm(formData: any, formDirective: FormGroupDirective, cerrar?: boolean) {
    if (!this.usuarioForm.invalid) {
      this.usuarioEdit = this.usuarioForm.getRawValue()
      this.userService.guardarUsuario(this.usuarioEdit).subscribe(
        data => {
          this.userService.usuariosFusionados().subscribe(
            data2 => {
              this.snackBar.open('CORRECTO', 'Usuario modificado con éxito', { duration: 8000, verticalPosition: 'top' })
              this.usuarios = data2
              this.editar = false
              this.dataSource = null
              this.dataSource = new MatTableDataSource(this.usuarios)
              this.dataSource.paginator = this.savePaginator
            },
            error => {
              this.snackBar.open('ERROR', 'Error al encontrar los usuarios', { duration: 8000, verticalPosition: 'top' })
              this.onNoClick()
            }
          )
        },
        error => {
          this.snackBar.open('ERROR', 'No ha sido posible guardar el usuario', { duration: 8000, verticalPosition: 'top' })
          this.onNoClick()
        }
      )
    }
  }

  editarUsuario(usuario: UsuarioFusion) {
    this.editar = true
    this.usuarioEdit = usuario
    this.createFormGroup()
  }
  cancelarEdit() {
    this.usuarioEdit = new UsuarioFusion
    this.editar = false
  }
  sortTable(sort: Sort) {
    this.usuarios = this.usuarios.sort((u1, u2) => {
      const isAsc = sort.direction === 'asc'
      switch (sort.active) {
        case 'nombre': {
          return this.compare(u1.nombre, u2.nombre, isAsc)
        }
        case 'rol': {
          return this.compare(u1.perfil, u2.perfil, isAsc)
        }
        case 'grupo': {
          return this.compare(u1.centroEmpresa, u2.centroEmpresa, isAsc)
        }
        default: return 0
      }
    })
    this.dataSource = new MatTableDataSource(this.usuarios)
    this.dataSource.paginator = this.paginator
  }
  compare(is1: number | string | Date, is2: number | string | Date, isAsc: boolean) {
    return (is1 < is2 ? -1 : 1) * (isAsc ? 1 : -1)
  }
}
@Component({
  selector: 'app-admin-usuarios',
  template: ''
})

export class AdminUsuariosComponent {
  constructor(public dialog: MatDialog) { }

  public open(): Observable<any> {
    const dialogRef = this.dialog.open(AdministrarUsuariosDialog, {
      width: '700px',
      height: '600px',
      maxHeight: '100vh'
    })
    return dialogRef.afterClosed()
  }

}


