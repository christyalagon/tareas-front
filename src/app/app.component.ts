import { Component, OnInit } from '@angular/core';
import { TestService } from './services/test/test.service';
import { Test } from './services/test/test';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tareas'
  datos: Test[]
  displayedColumns: string[] = ['descripcion', 'price']
  dataSource = new MatTableDataSource()
  constructor(private service: TestService,
    private router: Router) {
  }
  ngOnInit() {
  }
  getDatos() {
    this.service.getData().subscribe(data => {
      console.log(data)
      this.datos = data
      this.dataSource = new MatTableDataSource(this.datos)
    })
  }

  testDatos() {
    return this.datos[0].description + ' --- ' + this.datos[0].price
  }
  aniadirDatos() {
    const data: Test = new Test
    data.description = 'Testing'
    data.price = 100
    this.service.addData(data).subscribe(data2 => {
      this.getDatos()
    })
  }

  loggedIn() {
    if (sessionStorage.getItem('perfil') != null) {
      return true
    } else {
      return false
    }
  }
  cerrarSesion() {
    sessionStorage.removeItem('perfil')
    sessionStorage.removeItem('loginId')
    this.router.navigate(['/login'])
  }
}
