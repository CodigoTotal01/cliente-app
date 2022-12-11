import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../models/factura';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
})
export class DetalleFacturaComponent implements OnInit {

  factura!: Factura;

  titulo: string = 'Factura';

  constructor(
    private facturaService: FacturaService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(params => {
      let id = +params.get('id')!; 

      this.facturaService.getFactura(id).subscribe(factura => {
        this.factura = factura;
      });
      
    });
  }


  /*Notes*/

  /*
  activatedRouter obtener parametro-> .paramMap -> observable que tiene el arregl ode parawmetros, atento a cualuqier camibio en laruta 
  
  */
}
