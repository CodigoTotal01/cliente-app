import { Injectable } from '@angular/core';


import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Cliente, Region } from '../interfaces/interface';


import { Router } from '@angular/router'
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = "http://localhost:8080/api/clientes"

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })//cabezeras

  //! Manejar errores 
  private isNoAutizado(e: any):boolean{
    if(e.status ==  401 || e.status == 403){ //no autotizado / recurso proibido
      this.router.navigate(['/auth/login'])
      return true; // no esta autorizado
    }

    return false; // autorizadoo
  }



  constructor(private http: HttpClient, private router: Router) { } //iyectamos el servicio -> referencia

  getClientes(page: number): Observable<any> { //map para convertir tipo de dato 
    return this.http.get(this.urlEndPoint + '/page/' + page)
      .pipe( //encadena operadores
        tap((response: any) => {
          console.log("tap 1");
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre); // no hace nada 
          });
        }),
        map((response: any) => {
          (response.content as Cliente[]).map(cliente => {
            cliente.nombre = cliente.nombre.toUpperCase();
            return cliente;
          });
          return response;
        })
      );
  }





  //?Crear cliente
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.cliente as Cliente), //solo se estaria retornando lo del cliente 
        catchError(e => {

          
          if (this.isNoAutizado(e)) {
            return throwError(() => e);
          }
       

          if (e.status == 400) {
            return throwError(() => e);
          }
          console.log(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }


  //?editarCliente -> operador pipe
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
      .pipe( //tendremos acceso a todos los operadores del flujo ->  map() , filter() , concat() , y flatMap() .
        catchError(e => {//lo obttiene por defecto apartir de los status
              
          if (this.isNoAutizado(e)) {
            return throwError(() => e);
          }
          this.router.navigate(['/clientes']);
          console.log(e.error.mensaje);
          Swal.fire("Error al editar", e.error.mensaje, 'error');
          return throwError(() => e); //new for
        })
      );
  }

  //?Actualizar Cliente
  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
              
        if (this.isNoAutizado(e)) {
          return throwError(() => e);
        }

        if(e.status == 400){
          return throwError(() => e)
        }
        Swal.fire("Error al editar", e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }


  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        if (this.isNoAutizado(e)) {
          return throwError(() => e);
        }

        Swal.fire("Error al eliminar", e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }


  subirFoto(archivo: File, id: any): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    console.log(this.http.request(req).subscribe(req => console.log(req)))
    return this.http.request(req);
    
  }


  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint+"/regiones")
      .pipe(
        catchError(e=>{
          this.isNoAutizado(e);
          return throwError(()=>e);
        })
      )
  }

}
