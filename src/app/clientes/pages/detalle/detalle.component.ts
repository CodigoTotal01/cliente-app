import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/interface';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'; //notificaciones mas bonitas
import { HttpEventType } from '@angular/common/http';
import { DetalleService } from './detalle.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente!:Cliente;
  public fotoSeleccionada!: File | null ; 
  public progreso: number = 0;

  //subcribir cuando acambia el parametro del id
  constructor(private clienteService:ClienteService, 
    public modalService: DetalleService,
    public authService: AuthService) { }

  ngOnInit(): void {
    // this.activatedRouter.paramMap.subscribe(params => {
    //   let id:number = +params.get('id')!
    //   if(id){
    //     this.clienteService.getCliente(id).subscribe(cliente => {
    //           this.cliente  = cliente;
    //     })
    //   }
    // })
  }

  seleccionarFoto(event:any){
    this.fotoSeleccionada = event.target.files[0];
    if(this.fotoSeleccionada!.type.indexOf("image") < 0){ // metodo pra buscar si hay una coincidencia , y retornara la posicion , si no esta sera -1
      Swal.fire("Error al seleccionar imagen: ", "Debe seleccionar un archivo tipo  imagen", 'error');
      this.fotoSeleccionada = null;
      this.progreso  = 0 ;

    }
  }
  subirFoto(){
  
    if(!this.fotoSeleccionada){
      Swal.fire("Error al subir imagen: ", "Debe seleccionar una foto antes", 'error');

    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id! ).subscribe(
        event => {
          //! si el evento se esta subiendo 
          if(event.type === HttpEventType.UploadProgress){
              this.progreso = Math.round((event.loaded/event.total!)*100);
          }else if(event.type == HttpEventType.Response){ //! nuncda llega aqui mi codigo 
              let response: any = event.body;
               this.cliente = response.cliente as Cliente;
               //pendiente al cambio 
               this.modalService.nofiticarUpload.emit(this.cliente) // los parentesis sobran en un get
               Swal.fire("La foto se a subido completamente!", response.mensaje,'success' )

          }
        }
      )
    }

  }


  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
