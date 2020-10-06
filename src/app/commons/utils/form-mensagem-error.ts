import { ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormMensagemError {
    private static readonly errorMessages = {
        'required': () => 'Campo com preenchimento obrigatório!',
        'loteOuCanteiroRequired': () => 'A escolha de um Lote ou de um Canteiro é obrigatório!',
        'date': () => 'Data no formato inválido.',
        'intervaloMaiorQueTresMeses': () => 'As datas informadas não podem ultrapassar o período de três meses.',
        'intervaloMaiorQueUmMes': () => 'As datas informadas não podem ultrapassar o período de um meses.',
        'dataInicioMaiorQueFinal': () => 'Data início não pode ser maior que a data final.',
        'intervaloMaiorQueDoisMeses': () => 'As datas informadas não podem ultrapassar o intervalo maior que 60(sessenta) dias.',
        'daeInicioMaiorQueFim': () => 'Dae início não pode ser maior que o dae final!',
        'bloquearControle': () => '',
        'dataInvalida': () => 'Insira um valor válido. O campo está incompleto ou tem uma data inválida!',
        'dataMinimaInvalida': () => 'O valor deve ser 01/01/1500 ou posterior.',
        'dataVisitaInicio': () => 'O valor deve ser 31/12/2020 ou anterior.',
        'valorInicioMaiorQueFinal': () => 'Valor início não pode ser maior que o valor final!'
    };

    getErrors(errors: ValidationErrors): string[] {
        return Object.keys(errors)
            .map(error => this.getMessage(error, errors[error]));
    }

    private getMessage(nomeError: string, objetoErro: ValidationErrors) {
        return FormMensagemError.errorMessages[nomeError](objetoErro);
    }
}
