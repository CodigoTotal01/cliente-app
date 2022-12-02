import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/listado/clientes.component';
import { FormComponent } from './pages/form/form.component';

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
        path: "form",
        component: FormComponent 
       },
       {
        path: "form/:id", //recivira un parametro 
        component: FormComponent 
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
