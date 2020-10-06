import { Funcionario } from './../../components/funcionario';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }


  insert(funcionario: Funcionario){
    this.angularFireDatabase.list("funcionarios").push(funcionario)
    .then((result: any) => {
      console.log('Insert = ', JSON.stringify(result));
    });
  }

  update(funcionario: Funcionario, key: string){
    this.angularFireDatabase.list("funcionarios").update(
      key,
      funcionario
    )
  }


  getAll() : Observable<any> {

    return this.angularFireDatabase.list("funcionarios")
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(data => ({key: data.payload.key, ... data.payload.exportVal()  }));
      })
    )



  //   return this.conexaoFirebase.collection("produtos").onSnapshot((documentos) => {

  //     return documentos;
  //   });

 

  }

  deletar(key: string){
    this.angularFireDatabase.object(`funcionarios/${key}`).remove();
  }


}
