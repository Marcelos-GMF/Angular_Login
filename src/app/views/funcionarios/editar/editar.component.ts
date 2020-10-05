import { Funcionario } from './../../../components/funcionario';
import { FuncionarioDataService } from './../funcionario-data.service';
import { FuncionarioService } from './../funcionario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  funcionario: Funcionario;
  key: string = '';

  constructor(private funcionarioService: FuncionarioService,
              private funcionarioDataService: FuncionarioDataService) { }

  ngOnInit(): void {

      this.funcionario = new Funcionario();

      this.funcionarioDataService.funcionarioAtual.subscribe(data => {
        
        if(data.funcionario && data.key){
          this.funcionario = new Funcionario();
          this.funcionario.nome = data.funcionario.nome;
          this.funcionario.departamento = data.funcionario.departamento;
          this.key = data.key;
        }

      });

      
    }
  
    onSubmit(){
       console.log('Submit = ', this.funcionario);
      if(this.key){
        this.funcionarioService.update(this.funcionario, this.key);
      }else {
        this.funcionarioService.insert(this.funcionario);
      }

      this.funcionario = new Funcionario();
      this.key = null;
 
    }

}
