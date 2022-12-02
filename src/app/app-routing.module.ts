import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectivasComponent } from './directivas/directivas.component';

import { ClientesModule } from './clientes/clientes.module';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/clientes/listado',
    pathMatch: 'full' 
  },

  {
      path: 'directivas',
      component: DirectivasComponent,
  },

  {
    path: 'clientes',
    loadChildren: ()=> import("./clientes/clientes.module").then(m=>m.ClientesModule)

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
