import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/interface';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'; //notificaciones mas bonitas

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
})
export class DetalleComponent implements OnInit {

  cliente!:Cliente;
  private fotoSeleccionada!: File;

  //subcribir cuando acambia el parametro del id
  constructor(private clienteService:ClienteService, 
              private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(params => {
      let id:number = +params.get('id')!
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente => {
              this.cliente  = cliente;
        })
      }
    })
  }

  seleccionarFoto(event:any){
    this.fotoSeleccionada = event.target.files[0]
  }
  subirFoto(){
    console.log("subiendo foto ")
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id! ).subscribe(
      cliente => {
        this.cliente = cliente; // pero viene ocn la foto 
        Swal.fire("La foto se a subido completamente!", `La foto ${this.cliente.foto} se a subido`,'success' )
      }
    )
  }

}
