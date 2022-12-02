import { Injectable } from '@angular/core';


import {Observable, of, tap, throwError} from 'rxjs';
import{map, catchError} from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../interfaces/interface';


import { Router} from '@angular/router'
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = "http://localhost:8080/api/clientes"

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })//cabezeras

  constructor(private http: HttpClient, private router: Router) { } //iyectamos el servicio -> referencia

  getClientes(): Observable<Cliente[]> { //map para convertir tipo de dato 
    return this.http.get(this.urlEndPoint)
      .pipe( //encadena operadores

        map(response => response as Cliente[]),
        tap(resp => { console.log("Si funciono") })
      );
  }

  //?Crear cliente
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, { headers: this.httpHeaders })
        .pipe(
          map((response:any ) => response.cliente as Cliente), //solo se estaria retornando lo del cliente 
          catchError(e => {
            if(e.status == 400){
              return throwError(()=>e);
            }
            console.log(e.error.mensaje);
            Swal.fire(e.error.mensaje, e.error.error, 'error');
            return throwError(()=>e);
          })
        );
  }


  //?editarCliente -> operador pipe
  getCliente(id:number ): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
      .pipe( //tendremos acceso a todos los operadores del flujo ->  map() , filter() , concat() , y flatMap() .
          catchError(e => {//lo obttiene por defecto apartir de los status
            if(e.status == 400){
              return throwError(()=>e);
            }
            this.router.navigate(['/clientes']);
            console.log(e.error.mensaje); 
            Swal.fire("Error al editar", e.error.mensaje, 'error');
            return throwError(()=> e); //new for
          })
      );
  }

  //?Actualizar Cliente
  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente ,  { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire("Error al editar", e.error.mensaje, 'error');
        return throwError(()=>e);
      })
    );
  }


  delete(id:number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire("Error al eliminar", e.error.mensaje, 'error');
        return throwError(()=>e);
      })
    );
  }

}
