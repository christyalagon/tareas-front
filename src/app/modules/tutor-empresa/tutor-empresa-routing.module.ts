import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../auth/auth.guard'
import { HomeComponent } from './home/home.component'
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component'
import { EmpresaGuard } from '../auth/empresa.guard'


const routes: Routes = [{ path: 'tutor-empresa', component: HomeComponent, canActivate: [AuthGuard, EmpresaGuard] },
{ path: 'tutor-empresa/crear', component: CrearTareaComponent, canActivate: [AuthGuard, EmpresaGuard] }]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard]
})
  export class TutorEmpresaRoutingModule { }
