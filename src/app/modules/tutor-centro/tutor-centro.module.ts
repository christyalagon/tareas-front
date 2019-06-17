import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TutorCentroRoutingModule } from './tutor-centro-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppMaterialModule } from 'src/app/app-material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { TutorCentroComponent } from './layout/tutor-centro.component'
import { AdminUsuariosComponent, AdministrarUsuariosDialog } from './admin-usuarios/admin-usuarios.component';
import { CrearAlumnosComponent, CrearAlumnosDialog } from './crear-alumnos/crear-alumnos.component'
import { ListarTareasComponent, ListarTareasDialog } from './listar-tareas/listar-tareas.component';

@NgModule({
  imports: [
    CommonModule,
    TutorCentroRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  declarations: [TutorCentroComponent,
    AdminUsuariosComponent,
    AdministrarUsuariosDialog,
    CrearAlumnosComponent,
    CrearAlumnosDialog,
    ListarTareasComponent,
    ListarTareasDialog],
  entryComponents: [AdminUsuariosComponent,
    AdministrarUsuariosDialog,
    CrearAlumnosComponent,
    CrearAlumnosDialog,
    ListarTareasComponent,
    ListarTareasDialog],
  providers: [AdminUsuariosComponent,
    CrearAlumnosComponent,
    ListarTareasComponent]
})
export class TutorCentroModule { }
