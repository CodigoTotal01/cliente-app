import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/listado/clientes.component';
import { FormComponent } from './pages/form/form.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes = [
  {
    path:'',
    //no tenemos un compoenente principal que meustre los demas compoenntes
    
    children : [
      {
       path: "listado",
       component: ClientesComponent 
      },
      {
        path: "page/:page", //enviamos como un parametro normal solo ten cuidado al emplearlo
        component: ClientesComponent 
       },
      {
        path: "form",
        component: FormComponent,
        canActivate:[AuthGuard, RoleGuard],
        canLoad:[AuthGuard],
        data:{
          role: 'ROLE_ADMIN'
        }
       },
       {
        path: "form/:id", //recivira un parametro 
        component: FormComponent,
        canActivate:[AuthGuard, RoleGuard],
        canLoad:[AuthGuard],
        data:{
          role: 'ROLE_ADMIN'
        }
       },
      
      {
        path: '**',
        redirectTo: 'listado'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
