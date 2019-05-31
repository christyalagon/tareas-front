// auth.guard.ts
import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { LoginService } from 'src/app/services/login/login.service'
import { environment } from 'src/environments/environment'

@Injectable()
export class EmpresaGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem('perfil') === environment.empresaPerfil) {
      return true
    } else {
      if (sessionStorage.getItem('perfil') === environment.profesorPerfil) {
        this.router.navigate(['/tutor-centro'])
      } else {
        this.router.navigate(['/login'])
      }
      return false
    }
  }
}
