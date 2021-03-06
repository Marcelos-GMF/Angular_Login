import { Funcionario } from './../../components/funcionario';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioDataService {

  constructor() { }

  private funcionarioSource = new BehaviorSubject( {
    funcionario: null, key: ''
  });

  // Objeto assincrono: asObservable
  funcionarioAtual = this.funcionarioSource.asObservable();

  obtemFuncionario(funcionario: Funcionario, key: string){
    this.funcionarioSource.next({
      funcionario: funcionario, key: key
    })

    console.log('Obter = ', funcionario, ' Chave = ', key);

  }
}
