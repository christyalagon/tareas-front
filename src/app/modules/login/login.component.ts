import { Component, OnInit } from '@angular/core'
import { LoginService } from 'src/app/services/login/login.service'
import { Router } from '@angular/router'
import { User } from 'src/app/services/login/user'
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string
  constructor(private loginService: LoginService,
    private router: Router,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  login() {
    this.loginService.login(this.username).subscribe(
      data => {
        console.log(data)
        if (data != null) {
          const user: User = data
          if (data) {
            sessionStorage.setItem('loginId', user.id.toString())
            sessionStorage.setItem('perfil', user.perfil)
            this.snackBar.open('CORRECTO', 'Login correcto', { duration: 8000, verticalPosition: 'top' })
            if (user.perfil === '1') {

              this.router.navigate(['/tutor-empresa'])
            } else if (user.perfil === '0') {
              this.router.navigate(['/tutor-centro'])

            }
          }
        } else {
          this.snackBar.open('ERROR', 'No existe ese nombre de usuario', { duration: 8000, verticalPosition: 'top' })
        }
      },
      error => {
        this.snackBar.open('ERROR', 'No es posible realizar el login', { duration: 8000, verticalPosition: 'top' })
      }
    )
  }

}
