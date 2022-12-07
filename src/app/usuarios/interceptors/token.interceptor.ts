import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService, private router: Router){

  }

  
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

      let token = this.authService.token;

      if(token != null){
        const authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer '+token) // lo coloicamos el tojen el la cabezera 
        });

        return next.handle(authReq); //? pasa al proximo interceptor -> dentro del stack de interceptores, añadir nuetra cabecera personalizada 
      }
    return next.handle(req);
  }
}