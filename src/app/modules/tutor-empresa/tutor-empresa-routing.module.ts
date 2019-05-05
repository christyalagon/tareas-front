import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';


const routes: Routes = [{ path: 'tutor-empresa', component: HomeComponent, canActivate: [AuthGuard] },
{ path: 'tutor-empresa/crear', component: CrearTareaComponent, canActivate: [AuthGuard] }]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard]
})
  export class TutorEmpresaRoutingModule { }
