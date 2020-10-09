import { AuthService } from './auth.service';
import { UsuarioVO } from './../../../model/vo/usuario.vo';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormUtil } from 'src/app/commons/utils/form-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formGroupLogin: FormGroup;
  public usuarioVO: UsuarioVO;
  // public versaoVO: VersaoVO = new VersaoVO();
  public ambiente;
  // bsModalRef: BsModalRef;
  isCapsOn: boolean = false;
  typoSenha: string = 'password';

  @HostListener('window:keyup', ['$event']) keyUp(event: KeyboardEvent) {


   const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    if (capsOn) {
       this.isCapsOn = true;
   } else {
      this.isCapsOn = false;
   }


  }

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.usuarioVO = new UsuarioVO();
      this.iniciarForm();
  }

  iniciarForm() {
    this.formGroupLogin = this.formBuilder.group({
      chave: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }


  onSubmit() {
    console.log('Submit = ', this.formGroupLogin.value, ' Valida = ', this.formGroupLogin.valid);
    if (this.formGroupLogin.valid) {

         this.auth.logar(this.formGroupLogin.value);

        // if (this.key) {
        //   this.funcionarioService.update(this.funcionario, this.key);
        // } else {
        //   this.funcionarioService.insert(this.funcionario);
        // }

        // this.funcionario = new Funcionario();
        // this.key = null;

    } else {
      FormUtil.verificarValidacaoForm(this.formGroupLogin);
    }

  }

  exibirOcultarSenha() {
    if (this.typoSenha === 'password') {
       this.typoSenha = 'text';
    } else {
      this.typoSenha = 'password'
    }
  }

}
