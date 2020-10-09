import { UsuarioVO } from './../../../model/vo/usuario.vo';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  constructor(private router: Router) { }

  logar(usuarioVO: UsuarioVO){

      if(usuarioVO.chave === 'MARCELOS' && usuarioVO.senha === 'Teste12345') {
          console.log('Dentro do if', usuarioVO);
          this.usuarioAutenticado = true;
          this.router.navigate(['/editar'])
      } else{
        console.log('Dentro do else', usuarioVO);
          this.usuarioAutenticado = false;
      }

  }
  
}
