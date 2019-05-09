import { Component, OnInit } from '@angular/core'
import { LoginService } from 'src/app/services/login/login.service'
import { Router } from '@angular/router'
import { User } from 'src/app/services/login/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string
  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.loginService.login(this.username).subscribe(
      data => {
        console.log(data)
        const user: User = data
        if (data) {
          sessionStorage.setItem('loginId', user.id.toString())
          sessionStorage.setItem('perfil', user.perfil)
          this.router.navigate(['/tutor-empresa'])
        }
      }
    )
  }

}
