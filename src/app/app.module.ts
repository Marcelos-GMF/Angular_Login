import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { FormMensagemError } from './commons/utils/form-mensagem-error';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ListComponent } from './views/funcionarios/list/list.component';
import { EditarComponent } from './views/funcionarios/editar/editar.component';
import { FuncionarioDataComponent } from './views/funcionarios/funcionario-data/funcionario-data.component';
import { FormMensagemComponent } from './commons/form-mensagem/form-mensagem.component';

// import { MaterializeModule } from "angular2-materialize";

  // Import components
  import {
    FooterComponent,
    HeaderComponent
    // AppAsideComponent,
    // AppBreadcrumbsComponent,
    // AppSidebarComponent,
    // AppSidebarFooterComponent,
    // AppSidebarFormComponent,
    // AppSidebarHeaderComponent,
    // AppSidebarMinimizerComponent,
    // APP_SIDEBAR_NAV
  } from './components';
import { LoginComponent } from './views/pages/login/login.component';

  const APP_COMPONENTS = [
    FooterComponent,
    HeaderComponent,
    // AppAsideComponent,
    // AppBreadcrumbsComponent,
    // AppSidebarComponent,
    // AppSidebarFooterComponent,
    // AppSidebarFormComponent,
    // AppSidebarHeaderComponent,
    // AppSidebarMinimizerComponent,
    // APP_SIDEBAR_NAV
  ]

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EditarComponent,
    FuncionarioDataComponent,
    ...APP_COMPONENTS,
    HeaderComponent,
    LoginComponent,
    // FullLayoutComponent,
    //  ,FormMensagemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
    // MaterializeModule
  ],

  exports: [
    // DndModule,
    SharedModule
  ],
  providers: [FormMensagemError],
  // entryComponents: [
  //   ModalSimplesComponent,
  //   ModalConfirmacaoComponent,
  //   ModalInputCepComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor() {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

}