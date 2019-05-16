import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TutorCentroRoutingModule } from './tutor-centro-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppMaterialModule } from 'src/app/app-material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap'
import { TutorCentroComponent } from './layout/tutor-centro.component'
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component'

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
    RouterModule.forRoot([]),
    NgbPopoverModule
  ],
  declarations: [TutorCentroComponent, AdminUsuariosComponent]
})
export class TutorCentroModule { }
