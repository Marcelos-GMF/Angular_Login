import { FormUtil } from './../../../commons/utils/form-utils';
import { Funcionario } from './../../../components/funcionario';
import { FuncionarioDataService } from './../funcionario-data.service';
import { FuncionarioService } from './../funcionario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  formGroupEditar: FormGroup;

  funcionario: Funcionario;
  key: string = '';

  constructor(private funcionarioService: FuncionarioService,
    private funcionarioDataService: FuncionarioDataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.iniciarTela();
    this.funcionario = new Funcionario();

    this.funcionarioDataService.funcionarioAtual.subscribe(data => {

      if (data.funcionario && data.key) {
        this.funcionario = new Funcionario();
        this.funcionario.nome = data.funcionario.nome;
        this.funcionario.departamento = data.funcionario.departamento;
        this.key = data.key;
      }
    });

  }

  iniciarTela() {
    this.formGroupEditar = this.formBuilder.group({
      nome: [null, Validators.required],
      departamento: [null, Validators.required]
    });
  }

  onSubmit() {
    console.log('Submit = ', this.formGroupEditar.value, ' Valida = ', this.formGroupEditar.valid);
    if (this.formGroupEditar.valid) {

        if (this.key) {
          this.funcionarioService.update(this.funcionario, this.key);
        } else {
          this.funcionarioService.insert(this.funcionario);
        }

        this.funcionario = new Funcionario();
        this.key = null;

    } else {
      FormUtil.verificarValidacaoForm(this.formGroupEditar);
    }

  }

  public validarCampo(campo) {
    return FormUtil.validarCampoFormulario(this.formGroupEditar, campo);
  }

  public aplicaCssErro(campo) {
    return {
      'is-invalid': this.validarCampo(campo),
      'has-feedback': this.validarCampo(campo)
    }
  }

  // validarNumero(event: any): void {
  //   return MascaraUtils.validaNumero(event);
  // }

  // validaLetra(evt) {
  //   return MascaraUtils.validaLetra(evt);
  // }

  aplicarCSSErro(controlName: string) {
    return FormUtil.aplicarCSSErro(this.formGroupEditar, controlName);
  }

  mostrarErro(controlName: string) {
    return FormUtil.mostrarErro(this.formGroupEditar, controlName);
  }

  limpar() {
    this.formGroupEditar.reset();
  }

}
