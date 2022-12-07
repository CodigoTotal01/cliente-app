import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Cliente, Region } from '../interfaces/interface';

import { Router } from '@angular/router'




@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = "http://localhost:8080/api/clientes"


  //! por defecto ahora sera de tipo json la palicacion


  //private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })//cabezeras, inmutable -> agregamos con apend retorna una nueva instancia -> agregar metodo autorization
/* sustituido por el interceptor, leimina la vacevra de las demas peticiones 
  private agregarAutorizationHeader(){
    let token = this.authService.token;
    if(token !=null){
      return this.httpHeaders.append('Authorization', 'Bearer '+ token); //enviar el token en la cabezera 
    }

    return this.httpHeaders; // si no hay nada retornamos lo normal sin anda 
  }
  */



  
  



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
    return this.http.post(this.urlEndPoint, cliente)
      .pipe(
        map((response: any) => response.cliente as Cliente), //solo se estaria retornando lo del cliente 
        catchError(e => {

          console.log(e.error.mensaje);
          if (e.status == 400) {
            return throwError(() => e);
          }
          if(e.error.mensaje){
              console.log(e.error.mensaje);
          }
          return throwError(() => e);
        })
      );
  }


  //?editarCliente -> operador pipe
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
      .pipe( //tendremos acceso a todos los operadores del flujo ->  map() , filter() , concat() , y flatMap() .
        catchError(e => {//lo obttiene por defecto apartir de los status
          if(e.status != 401 && e.error.mensaje ){ //cuando el eerror es distinto a 401
            this.router.navigate(['/clientes']);
            console.log(e.error.mensaje);
          }
          return throwError(() => e); //new for
        })
      );
  }

  //?Actualizar Cliente
  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      catchError(e => {
              
        console.log(e.error.mensaje);

        if(e.status == 400){
          return throwError(() => e)
        }
        if(e.error.mensaje){
          console.log(e.error.mensaje);
      }
        return throwError(() => e);
      })
    );
  }


  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
 
        if(e.error.mensaje){
          console.log(e.error.mensaje);
      }

        return throwError(() => e);
      })
    );
  }

  //HttpEvent<{}> // el tipo de retorno lo confundia
  subirFoto(archivo: File, id: any): Observable<any> {
    //! form data -> no json --> nueva instancia 

  
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);


    // let httpHeaders = new HttpHeaders();
    // let token = this.authService.token;
    // if(token !=null){
    //   httpHeaders=  httpHeaders.append('Authorization', 'Bearer '+ token); //enviar el token en la cabezera , retorna una nueva instancia
    // }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      // headers:  httpHeaders
    });


    return this.http.request(req); // controlado por nuestr interceptor 

  }


  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint+"/regiones")
      .pipe(catchError(e=>{return throwError(()=>e);}))
  }

}
