import { AngularFireDatabase } from '@angular/fire/database';
import { UsuarioVO } from './../../../model/vo/usuario.vo';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  constructor(private angularFireDatabase: AngularFireDatabase, 
              private angularFireAuth: AngularFireAuth,            
              private router: Router) { }

  logar(usuarioVO: UsuarioVO){

    // this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider());

      // if(usuarioVO.chave === 'MARCELOS' && usuarioVO.senha === 'Teste12345') {
      //     console.log('Dentro do if', usuarioVO);
      //     this.usuarioAutenticado = true;
      //     this.router.navigate(['/editar'])
      // } else{
      //   console.log('Dentro do else', usuarioVO);
      //     this.usuarioAutenticado = false;
      // }
      this.insert(usuarioVO);

  }

  insert(usuarioVO: UsuarioVO){
    console.log('Inserir', usuarioVO);
    this.angularFireAuth.createUserWithEmailAndPassword(usuarioVO.email, usuarioVO.senha)
                     .then(usuario => {
                       console.log('Insert = ', JSON.stringify(usuario));
     });


    // this.angularFireAuth
    //                 .auth()
    //                 .createUserWithEmailAndPassword(usuarioVO.email,usuarioVO.senha)
    //                 .then((result: any) => {
    //                   console.log('Insert = ', JSON.stringify(result));
    // });
  }
  
}
