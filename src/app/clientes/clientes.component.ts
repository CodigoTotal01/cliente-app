import { Component, OnInit } from '@angular/core';
import { Cliente } from './interfaces/interface';
import { CLIENTES } from './clientes.json';
import { ClienteService } from './services/cliente.service';


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

}
