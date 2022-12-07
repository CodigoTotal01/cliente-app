import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../usuarios/usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private _usuario!: Usuario | null;
  private _token!: string | null;





  constructor(private http: HttpClient) { }


  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario')!= null){
      this._usuario  =  JSON.parse(sessionStorage.getItem('usuario')!) as Usuario;
      return this._usuario;
    }
    return new Usuario(); // vacio sin datos si no hay nada 
  }

  public get token(): string | null{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token')!= null){
      this._token  =  sessionStorage.getItem('token')!; //! cuando pases un metodo que retorna null dile que congfeie en diosito 
      return this._token;
    }
    return null; // vacio sin datos si no hay nada 
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndPoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345'); //muy sencible la informacion y los espaciados 
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + credenciales });


    let params = new URLSearchParams(); //confibierte todo en una ruta 
    params.set("grant_type", 'password'); // consecion por contraseña 
    params.set("username", usuario.username!); //parametros -> tu confia tendras un valor 
    params.set("password", usuario.password!); //parametros -> tu confia tendras un valor 

    return this.http.post<any>(urlEndPoint, params.toString(), { headers: httpHeaders });
  }



  guardarUsuario(accessToken: string): void{
    let payload = this.obtenerDatosToken(accessToken);
    console.log(payload)
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;

    //? guardar el usuario en el lcoal estorage 
    sessionStorage.setItem("usuario", JSON.stringify(this._usuario)); // confvertir objeto a string 

  }

  guardarToken(accessToken: string): void{
    this._token = accessToken;
    sessionStorage.setItem("token", this._token); // confvertir objeto a string 

  }

  obtenerDatosToken(accessToken:string):any{
    if(accessToken != null){
      return (JSON.parse(atob(accessToken.split('.')[1])));// botener las cossa buenas uwu , aqui todo bien 
    }
    return null;
  }




  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token!); //consulta directramente en nuestro service o en nuestro localsotage
    if(payload != null && payload.user_name && payload.user_name.length > 0){
        return true;
    }
    return false;
  }



  //para ocultar los botones

  hasRole(role: string): boolean{
    //si ecxxiste algun elemento dentro de ese elemento 
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }



  //salir de la cuenta 
  logout():void{
    this._token = null;
    this._usuario = null;
    sessionStorage.clear(); //remover de golpe 
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
