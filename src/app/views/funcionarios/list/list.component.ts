import { Funcionario } from './../../../components/funcionario';
import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../funcionario.service';
import { FuncionarioDataService } from '../funcionario-data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  funcionarios: any[]=[];
  p_funcionarios: number = 0;

  constructor(private rota: Router,
              private funcionarioService: FuncionarioService,
              private funcionarioDataService: FuncionarioDataService) { }

  ngOnInit(): void {
   
    this.funcionarioService.getAll().subscribe((resposta: Funcionario[]) => {
      this.funcionarios = resposta;
      console.log('lista = ', resposta);
    });
    
  }

  delete(key: string){
     this.funcionarioService.deletar(key);
  }

  editar(funcionario: Funcionario, key: string){
    this.funcionarioDataService.obtemFuncionario(funcionario, key);
    this.rota.navigate(['/editar']);
  }

  incluir(){
    this.rota.navigate(['/editar']);
  }

}
