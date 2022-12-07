import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {catchError} from 'rxjs/operators'

/** Pass untouched request through to the next request handler. */

//! manejaremos la respuesta aqui -> para los errores 401 or 403
@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService, private router: Router){

  }

  
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
        catchError(e => {
          if(e.status ==  401){ //no autotizado, recuerda que el token expira en el bakend debemso cerrrar seion 

            if(this.authService.isAuthenticated()){
              this.authService.logout();
            }
            this.router.navigate(['/auth/login'])

          }
      
      
          if(e.status == 403){ //forbiden acceso proibido -> rol distinto a ROLE_ADMIN 
            Swal.fire("Acceso Denegado", "Opcion valida solo para Administradores", 'warning');
            this.router.navigate(['/clientes'])

          }

          return throwError(() => e);
    
        })
    );
  }
}