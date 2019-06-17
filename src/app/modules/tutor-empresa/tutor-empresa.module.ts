import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home/home.component'
import { RouterModule } from '@angular/router'
import { ProfesorGuard } from '../auth/profesor.guard'
import { TutorEmpresaRoutingModule } from './tutor-empresa-routing.module'
import { AppMaterialModule } from 'src/app/app-material.module'
import { CrearTareaComponent, CrearTareaDialog } from './crear-tarea/crear-tarea.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EmpresaGuard } from '../auth/empresa.guard'
import { AsignarTareasComponent, AsignarTareaDialog } from './asignar-tareas/asignar-tareas.component'
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap'
import { PuntuarTareasComponent, PuntuarTareaDialog } from './puntuar-tareas/puntuar-tareas.component'
import { ListarNotasComponent, ListarNotasDialog } from './listar-notas/listar-notas.component'
import { CrearProyectoDialog, CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { ListarProyectosComponent, ListarProyectosDialog } from './listar-proyectos/listar-proyectos.component';

@NgModule({
  imports: [
    TutorEmpresaRoutingModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    NgbPopoverModule
  ],
  declarations: [HomeComponent,
    CrearProyectoComponent, CrearProyectoDialog,
    CrearTareaComponent, CrearTareaDialog,
    AsignarTareasComponent, AsignarTareaDialog,
    PuntuarTareaDialog, PuntuarTareasComponent,
    ListarNotasComponent, ListarNotasDialog,
    ListarProyectosComponent, ListarProyectosDialog],
  entryComponents: [CrearProyectoComponent, CrearProyectoDialog,
    CrearTareaComponent, CrearTareaDialog,
    AsignarTareasComponent,
    AsignarTareaDialog,
    PuntuarTareasComponent, PuntuarTareaDialog,
    ListarNotasComponent, ListarNotasDialog,
    ListarProyectosComponent, ListarProyectosDialog],
  exports: [CrearProyectoComponent, CrearTareaComponent,
    AsignarTareasComponent, PuntuarTareasComponent,
    ListarNotasComponent, ListarProyectosComponent],
  providers: [ProfesorGuard,
    CrearProyectoComponent, CrearTareaComponent, EmpresaGuard, AsignarTareasComponent, PuntuarTareasComponent, ListarNotasComponent,
    ListarProyectosComponent]
})
export class TutorEmpresaModule { }
