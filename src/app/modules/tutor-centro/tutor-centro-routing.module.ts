import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../auth/auth.guard'
import { TutorCentroComponent } from './layout/tutor-centro.component'
import { ProfesorGuard } from '../auth/profesor.guard'


const routes: Routes = [{ path: 'tutor-centro', component: TutorCentroComponent, canActivate: [AuthGuard, ProfesorGuard] }]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard]
})
  export class TutorCentroRoutingModule { }
