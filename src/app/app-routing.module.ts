import { ListComponent } from './views/funcionarios/list/list.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { EditarComponent } from './views/funcionarios/editar/editar.component';
import { LoginComponent } from './views/pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  // {
  //   path: '',
  //   canActivate: [AngularFireAuthGuard]
  //   // redirectTo: 'principal',
  //   // pathMatch: 'full'
  // },
  { path: 'login', component: LoginComponent },
  { path: 'editar', component: EditarComponent},
  { path: 'lista', component: ListComponent},
  { path: '', 
    component: LoginComponent , 
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin } }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
