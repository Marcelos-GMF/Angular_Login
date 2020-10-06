import { Component, OnInit, Input } from '@angular/core';
import { ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'form-mensagem',
  templateUrl: './form-mensagem.component.html',
  styleUrls: ['./form-mensagem.component.css']
})
export class FormMensagemComponent {

  @Input()
  mostraErro: boolean = false;

  @Input()
  msg: string;

  @Input()
  get errors(): ValidationErrors {
    return this._errors;
  }

  _errors: ValidatorFn;

  set errors(errors: ValidationErrors) {
    if (errors) {
      Object.keys(errors).map(e => this.msg = FormMensagemComponent.getErrorMessage(e, errors[e]));
    } else {
      this.msg = null;
    }
  }

  static readonly getErrorMessage = (errorName: string, error: ValidationErrors) => {
    const message = {
      'required': 'Campo com preenchimento obrigatório ou entrada inválida!',
      'loteOuCanteiroRequired': 'A escolha de um Lote ou de um Canteiro é obrigatório!',
      'dataMinimaInvalida': 'O valor deve ser 01/01/1500 ou posterior.',
      'dataInicioMaiorQueFinal': 'Data início não pode ser maior que a data final.',
      'intervaloDeDiasNaoPermitido': 'Intervalo de dias máximo são de ' + error + ' dias.',
      'intervaloMaiorQueUmMeses': 'As datas informadas não podem ultrapassar o período de um meses.',
      'daeInicioMaiorQueFinal': 'Dae início não pode ser maior que o dae final!',
      'intervaloMaiorQueTresMeses': 'As datas informadas não podem ultrapassar o período de três meses.',
      'intervaloMaiorQueDoisMeses': 'As datas informadas não podem ultrapassar o intervalo maior que 60(sessenta) dias.',
      'valorInicioMaiorQueFinal': 'Valor início não pode ser maior que o valor final!',
      'dataNaoPodeSerMaiorOuIgualADataAtual': 'A data informada não pode ser maior ou igual a data atual.'
    }
    return message[errorName];
  }


}
