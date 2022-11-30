import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectivasComponent } from './directivas/directivas.component';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/clientes',
    pathMatch: 'full' 
  },

  {
      path: 'directivas',
      component: DirectivasComponent,
  },

  {
    path: 'clientes',
    component: ClientesComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
