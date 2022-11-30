import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/interface';
import { CLIENTES } from '../clientes.json';
import { map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = "http://localhost:8080/api/clientes"

  constructor(private http: HttpClient ) { } //iyectamos el servicio -> referencia

  getClientes(): Observable<Cliente[]> { //map para convertir tipo de dato 
    return this.http.get(this.urlEndPoint)
    .pipe( //encadena operadores
       
        map(response => response as Cliente[]),
        tap(resp => {console.log("Si funciono")})
    );
  }


}
