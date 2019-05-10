import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home/home.component'
import { Routes, RouterModule } from '@angular/router'
import { ProfesorGuard } from '../auth/profesor.guard'
import { TutorEmpresaRoutingModule } from './tutor-empresa-routing.module'
import { AppMaterialModule } from 'src/app/app-material.module'
import { CrearTareaComponent, CrearTareaDialog } from './crear-tarea/crear-tarea.component'
import { SharedModule } from 'src/app/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EmpresaGuard } from '../auth/empresa.guard'
import { AsignarTareasComponent, AsignarTareaDialog } from './asignar-tareas/asignar-tareas.component'
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap'

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
  declarations: [HomeComponent, CrearTareaComponent, CrearTareaDialog, AsignarTareasComponent, AsignarTareaDialog],
  entryComponents: [CrearTareaComponent, CrearTareaDialog, AsignarTareasComponent, AsignarTareaDialog],
  exports: [CrearTareaComponent, AsignarTareasComponent],
  providers: [ProfesorGuard, CrearTareaComponent, EmpresaGuard, AsignarTareasComponent]
})
export class TutorEmpresaModule { }
