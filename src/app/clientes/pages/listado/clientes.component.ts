import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/interface';
import { ClienteService } from '../../services/cliente.service';

import { CLIENTES } from './clientes.json';
import { tap } from 'rxjs/operators'
import Swal from 'sweetalert2'; //notificaciones mas bonitas
import { ParseError } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { DetalleService } from '../detalle/detalle.service';





@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  //confia en mi yo te dare valores 
  clientes: Cliente[] = [];
  paginador: any;

  clienteSeleccionado!: Cliente;

  //Activated Rou -> obtener el parametro por la ruta 
  constructor(private clientesService: ClienteService
    , private activatedRoute: ActivatedRoute
    ,
    private modalService: DetalleService) { }
  //cunando se inicia el compoenente 
  ngOnInit(): void {


    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.get("page"))
      let page: number = +params.get('page')!;
      if (!page) {
        page = 0;
      }
      //observable para ver el pcambio de parametros 
      this.clientesService.getClientes(page).pipe(
        tap(console.log) // tomar los datos pra hacer algo
      ).subscribe(response => {
        this.clientes = response.content as Cliente[],
          this.paginador = response //datos del paginador
      });

      this.modalService.nofiticarUpload.subscribe(cliente => {
        this.clientes = this.clientes.map(clienteOriginal => {
          if (cliente.id == clienteOriginal.id) {
            clienteOriginal.foto = cliente.foto;
          }
          return clienteOriginal;
        })
      })
    })



  }


  delete(cliente: Cliente): void {
    //preguntar si esta seguro de eleminar 
    Swal.fire({
      title: 'Está seguro?',
      text: `estas seguro de eliminar a ${cliente.nombre}  ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.delete(cliente.id!).subscribe(respose => {
          //! Cuando tengamos listas siempre recorrer el arreglo que etnga todos los datos no es tatttan reactivo o no es muy chismoso 
          this.clientes = this.clientes.filter(cli => cli != cliente); // si es distinto al cliente eleminado sacalo de la lista 
          Swal.fire(
            'Eliminado!',
            `El cliente ${cliente.nombre}  ${cliente.apellido} fue eliminado`,
            'success'
          )
        });

      }
    })
  }

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }



}
