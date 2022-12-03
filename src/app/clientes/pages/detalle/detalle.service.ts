import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  modal: boolean = false;
  //para indicar que es private 
  private _notificarUpload = new EventEmitter<any>(); //core 



  constructor() { }


  get nofiticarUpload(): EventEmitter<any> {
      return this._notificarUpload;
  } 

  abrirModal(){
    this.modal = true;
  }


  cerrarModal(){
    this.modal = false;
  }


}
