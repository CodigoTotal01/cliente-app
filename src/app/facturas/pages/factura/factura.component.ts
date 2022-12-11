import { Component, OnInit } from '@angular/core';
import { Factura } from '../../models/factura';
import { ClienteService } from '../../../clientes/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { FacturaService } from '../../services/factura.service';
import { Producto } from '../../models/producto';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
})
export class FacturaComponent implements OnInit {

  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();

  constructor(private clienteServices: ClienteService,
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService) { }


  autoCompleteControl = new FormControl('');
  // productos: string[] = ['Mesa', 'Tablet', 'Sambsun', 'Ariana'];
  productosFiltrados!: Observable<Producto[]>;

  //Al cargar el componente 

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId')!;
      this.clienteServices.getCliente(clienteId).subscribe(cliente =>
        this.factura.cliente = cliente
      );
    });

    // pruebita
    this.productosFiltrados = this.autoCompleteControl.valueChanges.pipe(
      //convertir los datos de n observable dentro de otro observavble 
 
      map((value: any | string) => typeof value  === "string" ? value: value.nombre),
      flatMap(value => value ?  this._filter(value): []),// al inicio se envia un carecter vacio por eso la validacion 
    );

  }



  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    //el texto que se este escribiendo se hara en minusculas 
    return this.facturaService.filtrarProductos(filterValue);
  }

  //?   ? parametro opcional 
  mostrarNombre(producto?: Producto) : string | any {
    return producto ? producto.nombre : '';
  }

}
