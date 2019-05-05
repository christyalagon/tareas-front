import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './modules/login/login.component';
import { TestComponent } from './modules/test/test.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { HomeComponent } from './modules/tutor-empresa/home/home.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'test', component: TestComponent, canActivate: [AuthGuard] }]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
