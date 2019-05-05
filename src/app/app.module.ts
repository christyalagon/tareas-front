import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestService } from './services/test/test.service';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from './app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { TestComponent } from './modules/test/test.component';
import { TutorEmpresaModule } from './modules/tutor-empresa/tutor-empresa.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    TutorEmpresaModule

  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
