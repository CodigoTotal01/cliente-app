import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router){

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.authService.isAuthenticated()){
        if(this.isTokenExpirado()){
           this.authService.logout();
           this.router.navigate(['/auth/login'])

           return false;
        }
          return true;
      }

    this.router.navigate(['/auth/login'])
    return false;
  }


  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isAuthenticated()){
        if(this.isTokenExpirado()){
           this.authService.logout();
           this.router.navigate(['/auth/login'])

           return false;
        }
          return true;
      }

    this.router.navigate(['/auth/login'])
    return false;
  }

  isTokenExpirado():boolean{
    let token = this.authService.token;
    let payload = this.authService.obtenerDatosToken(token!);

    let now = new Date().getTime() /1000; //fecha actual en segundos 

    //consultando si la fecha de del payload expito
    console.log(payload.exp)
    if(payload.exp < now){

      return true;
    }
    return false;
  }
}
