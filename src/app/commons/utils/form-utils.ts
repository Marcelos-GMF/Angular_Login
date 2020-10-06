import { DateValidator } from './../../shared/date-validator';
import { FormGroup, ValidatorFn, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';

// import { DateValidator } from '../shared/date-validator';

export class FormUtil {
  /**
  * Tratamento dos valores NULL nos campos de formulário
  * @param fg Formulário que será validado
  */

  static tratarNull(fg: FormGroup) {
    if (fg.valid) {

      Object.keys(fg.controls).forEach(e => {
        const controle = fg.get(e);

        if (controle.value === 'null') {
          controle.setValue(null);
        }
        if (controle.value === '') {
          controle.setValue(null);
        }

      })
    }
  }

  /**
   * Tratamento dos controles
   * @param fg Formulário que será validado
   */
  static verificarValidacaoForm(fg: FormGroup) {
    Object.keys(fg.controls).forEach(campo => {
      const controle = fg.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        FormUtil.verificarValidacaoForm(controle);
      }
    });
  }

  /**
 * Tratamento dos controles que estão com disabled
 * @param fg Formulário que será validado
 */
  static verificarValidacaoFormDisabled(fg: FormGroup) {
    Object.keys(fg.controls).forEach(campo => {
      const controle = fg.get(campo);
      if (controle.status !== 'DISABLED') {
        controle.markAsDirty();
      }
      if (controle instanceof FormGroup) {
        FormUtil.verificarValidacaoForm(controle);
      }
    });
  }

  /**
   * Efetuando a validação de campo do formulário
   * @param fg Formulário que será validado
   * @param campo Campo do formulário que será validado
   */
  static validarCampoFormulario(fg: FormGroup, campo) {
    return !fg.get(campo).valid && (fg.get(campo).touched || fg.get(campo).dirty);
  }

  // marca todos os campos como dirty desde que este tenha algum error
  static marcaComoDirtySeTemErro(fg: FormGroup) {
    Object.keys(fg.controls).forEach(campo => {
      const controle = fg.get(campo);
      if (controle.errors) {
        controle.markAsDirty();
      }
      if (controle instanceof FormGroup) {
        FormUtil.verificarValidacaoForm(controle);
      }
    });
  }

  // COMBO DE VALIDAÇÕES

  static aplicarCSSErro(formGroup: FormGroup, controlName?: string) {
    const resultado = this.isValid(formGroup, controlName);
    // return resultado ? { 'is-invalid': true } : null;
    // usado para retornar css verde para campos válidos
    return resultado ? { 'is-invalid': true } : formGroup.get(controlName).pristine && !resultado ? null : { 'is-valid': true };
  }

  // um campo é inválido qdo possui algum erro, e se tiver sido tocado ou ganho foco.
  static isValid(formGroup: FormGroup, controlName: string): boolean {
    return formGroup.get(controlName).errors && (formGroup.get(controlName).touched || formGroup.get(controlName).dirty) ? true : false;
  }

  static mostrarErro(formGroup: FormGroup, controlName: string) {
    return this.isValid(formGroup, controlName);
  }

  /**
   * @param controlName é um nome do controle.
   * @param control é o campo que está recebendo a validação este é fornecido pelo angular
   */
  static dataMinimaInvalida(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        return control.value.split('-')[0] < '1500' ? { dataMinimaInvalida: true } : null
      }
      return null;
    }
  }

  /**
   * @param dataFinal é o nome do campo final que vc quer fazer a comparação.
   * @param dataInicio é o campo que está recebendo a validação este é fornecido pelo angular
   */
  static dataInicioMaiorQueFinal(dataFinal: string): ValidatorFn {
    return (dataInicio: AbstractControl): ValidationErrors | null => {
      if (dataFinal && dataInicio.parent && dataInicio.parent.controls[dataFinal].value && dataInicio.value) {
        return dataInicio.value > dataInicio.parent.controls[dataFinal].value ? { dataInicioMaiorQueFinal: true } : null;
      }
      return null;
    }
  }

  // Recebe uma data e verifica se o valor é maior que uma segunda data
  static dataInicioMaiorQueFinalText(dataInicio: String): ValidatorFn {
    // recebe um controle do formulário como parâmetro, neste caso a data final e devolve um erro ou null
    return (controlNameDataFinal: AbstractControl): ValidationErrors | null => {
      // se dataInicio maior que dataFinal retorna um obj nessa estrutura { dataInicioMaiorQueFinal: true } caso contrário null
      return DateValidator.strToDate(dataInicio) > DateValidator.strToDate(controlNameDataFinal.value) ? { dataInicioMaiorQueFinal: true } : null;
    };
  }

  /**
   * @param dataFinal é o nome do campo final que vc quer fazer a comparação.
   * @param dataInicio é o campo que está recebendo a validação este é fornecido pelo angular
   */
  static intervaloDeDiasNaoPermitido(dataFinal: string, qtdDias: number): ValidatorFn {
    return (dataInicio: AbstractControl): { [key: string]: any } => {
      if (dataFinal && qtdDias && dataInicio.value && dataInicio.parent.controls[dataFinal].value) {

        const dtInicio: string = dataInicio.value;
        const dataInicioDate = new Date(dtInicio);
        const dataFinalDate = new Date(dataInicio.parent.controls[dataFinal].value);

        const utc1 = Date.UTC(dataInicioDate.getFullYear(), dataInicioDate.getMonth(), dataInicioDate.getDate());
        const utc2 = Date.UTC(dataFinalDate.getFullYear(), dataFinalDate.getMonth(), dataFinalDate.getDate());
        const diferencaDatas = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));

        return diferencaDatas > qtdDias ? { intervaloDeDiasNaoPermitido: qtdDias } : null;

      } else {
        return null;
        // throw new Error('Erro ao tentar executar o método intervaloDeDiasNaoPermitido(dataFinal: string, qtdDias: number):ValidatorFn.');
      }
    }
  }

  // usados em rel de atuacao e analise ocorrencia
  static intervaloMaiorQueTresMeses(dataInicio: String): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let dataFinal: string = control.value;
      let dataInicioDate = DateValidator.strToDate(dataInicio);
      let dataFinalDate = DateValidator.strToDate(dataFinal);

      if (dataInicioDate && dataFinalDate) {
        const utc1 = Date.UTC(dataInicioDate.getFullYear(), dataInicioDate.getMonth(), dataInicioDate.getDate());
        const utc2 = Date.UTC(dataFinalDate.getFullYear(), dataFinalDate.getMonth(), dataFinalDate.getDate());
        const diferencaDatas = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
        return diferencaDatas > 90 ? { intervaloMaiorQueTresMeses: true } : null;
      }
    };
  }
  // usado em leitura rel leitura
  static intervaloMaiorQueDoisMeses(dataInicio: String): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      let dataFinal: string = control.value;
      let dataInicioDate = DateValidator.strToDate2(dataInicio);
      let dataFinalDate = DateValidator.strToDate2(dataFinal);

      if (dataInicioDate && dataFinalDate) {
        const utc1 = Date.UTC(dataInicioDate.getFullYear(), dataInicioDate.getMonth(), dataInicioDate.getDate());
        const utc2 = Date.UTC(dataFinalDate.getFullYear(), dataFinalDate.getMonth(), dataFinalDate.getDate());
        const diferencaDatas = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
        return diferencaDatas > 60 ? { intervaloMaiorQueDoisMeses: true } : null;
      }
    };
  }

  /**
   * @param daeFinal é o nome do campo final que vc quer fazer a comparação.
   * @param daeInico é o campo que está recebendo a validação este é fornecido pelo angular
   */
  static daeInicioMaiorQueFinal(daeFinal: string): ValidatorFn {
    return (daeInico: AbstractControl): ValidationErrors | null => {
      if (daeInico.value && daeInico.parent.controls[daeFinal].value) {
        return Number(daeInico.value) > Number(daeInico.parent.controls[daeFinal].value) ? { daeInicioMaiorQueFinal: true } : null;
      }
      return null;
    }
  }

  static loteOuCanteiroRequired(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // static loteOuCanteiroRequired(control: AbstractControl) {
      if (control && control.parent) {
        const fg: FormGroup | FormArray = control.parent;
        let controle = control
        let outroControle = fg.get(controlName);
        return controle.value === null && outroControle.value === null ? { loteOuCanteiroRequired: true } : null;
      }
    }
  }

  /**
 * @param valorFinal é o nome do campo final que vc quer fazer a comparação.
 * @param valorInicial é o campo que está recebendo a validação este é fornecido pelo angular
 */
  static valorInicioMaiorQueFinal(valorFinal: string): ValidatorFn {
    return (valorInicial: AbstractControl): ValidationErrors | null => {
      if (valorInicial.value && valorInicial.parent.controls[valorFinal].value) {
        return Number(valorInicial.value) > Number(valorInicial.parent.controls[valorFinal].value) ? { valorInicioMaiorQueFinal: true } : null;
      }
      return null;
    }
  }

  static dataNaoPodeSerMaiorOuIgualADataAtual(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        return control.value >= this.obterDataAtual() ? { dataNaoPodeSerMaiorOuIgualADataAtual: true } : null;
      }
      return null;
    }
  }

  /**
   * @returns data atual no formato yyyy-mm-dd
   */
  static obterDataAtual() {
    let data = new Date();
    return data.getFullYear() + '-' + ('0' + (data.getMonth() + 1)).substr(-2) + '-' + ('0' + data.getDate()).substr(-2);
  }
}

