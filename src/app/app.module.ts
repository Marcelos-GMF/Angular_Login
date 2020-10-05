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


// import { MaterializeModule } from "angular2-materialize";

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EditarComponent,
    FuncionarioDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule
    // MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
