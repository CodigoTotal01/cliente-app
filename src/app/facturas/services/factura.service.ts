import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura } from '../models/factura';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndPoint: string = 'http://localhost:8080/api/facturas';

  //recuerdaque lo podemos usar gracias a que lo pasamos por el module app que registra nuest
  constructor(private http: HttpClient) { //pra hacer las petiicones http con observagles 
  }

  getFactura(id: number): Observable<Factura> { //get no requiere de nada mas que su parametro
    return this.http.get<Factura>(this.urlEndPoint+"/"+id);
  }



  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.urlEndPoint+"/"+id);
  }

  //? Filtrar productos 
  filtrarProductos(term: string):Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint+"/filtrar-productos/"+term);
  }


}