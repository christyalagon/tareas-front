import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { HttpClientModule } from '@angular/common/http'
import { AppMaterialModule } from './app-material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [
    AppMaterialModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
