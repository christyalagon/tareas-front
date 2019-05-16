import { Component, OnInit } from '@angular/core'
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service'

@Component({
  selector: 'app-tutor-centro',
  templateUrl: './tutor-centro.component.html',
  styleUrls: ['./tutor-centro.component.scss']
})
export class TutorCentroComponent implements OnInit {

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit() {
    console.log(this.usuarioService.usuariosFusionados().subscribe(
      data => {
        console.log(data)
      }
    ))
  }

}
