import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';


import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot, // obtendremos parametros atraves de las rutas 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login'])
      return false;
    }



    let role = route.data['role'] as string; //(cast)

    console.log(`El rol es : ${role}`)
    if (this.authService.hasRole(role)) {

      return true;
    }
    Swal.fire("Acceso Denegado", `Hola ${this.authService.usuario.username} , no tienes acceso `, 'warning');
    this.router.navigate(['/clientes'])
    return false;
  }

}
