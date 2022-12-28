import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

title:string = 'Express Game Controller';

  constructor(public authService: AuthService, private router:Router) { }


  logout():void{
    let username = this.authService.usuario.username;
    this.authService.logout(); //elimina la sesion del local storage 
    Swal.fire("Logout", `Esperamos volver a verte prondo ${username}, cerraste la sesion con exito!`,'success')
    this.router.navigate(["/auth/login"]);
  }



}
