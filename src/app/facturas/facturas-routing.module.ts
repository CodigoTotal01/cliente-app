import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleFacturaComponent } from './pages/detalle-factura/detalle-factura.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ":id",//guin añadidio automaticamente
        component: DetalleFacturaComponent,
        canActivate:[AuthGuard, RoleGuard],
        canLoad:[AuthGuard],
        data:{
          role: 'USER_ADMIN'
        }
      },
      {
        path: "form/:clienteId",//guin añadidio automaticamente
        component: FacturaComponent,
        canActivate:[AuthGuard, RoleGuard],
        canLoad:[AuthGuard],
        data:{
          role: 'ROLE_ADMIN'
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturasRoutingModule { }
