import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectivasComponent } from './directivas/directivas.component';

import { ClientesModule } from './clientes/clientes.module';
import { AuthModule } from './auth/auth.module';

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
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
