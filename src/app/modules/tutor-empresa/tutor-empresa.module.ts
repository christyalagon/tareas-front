import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/profesor.guard';
import { TutorEmpresaRoutingModule } from './tutor-empresa-routing.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
  ],
  declarations: [HomeComponent, CrearTareaComponent],
  providers: [AuthGuard]
})
export class TutorEmpresaModule { }
