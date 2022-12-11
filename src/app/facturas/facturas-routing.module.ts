import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleFacturaComponent } from './pages/detalle-factura/detalle-factura.component';
import { FacturaComponent } from './pages/factura/factura.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ":id",//guin añadidio automaticamente
        component: DetalleFacturaComponent
      },
      {
        path: "form/:clienteId",//guin añadidio automaticamente
        component: FacturaComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturasRoutingModule { }
