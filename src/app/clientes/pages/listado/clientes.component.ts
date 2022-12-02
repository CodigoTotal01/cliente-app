import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/interface';
import { ClienteService } from '../../services/cliente.service';

import { CLIENTES } from './clientes.json';

import Swal from 'sweetalert2'; //notificaciones mas bonitas





@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  //confia en mi yo te dare valores 
  clientes!: Cliente[];

  constructor(private clientesService: ClienteService) { }
  //cunando se inicia el compoenente 
  ngOnInit(): void {
    this.clientesService.getClientes().subscribe(clientes =>  this.clientes= clientes);
  }


  delete(cliente : Cliente): void{
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
        this.clientesService.delete(cliente.id!).subscribe(respose =>{
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
}
