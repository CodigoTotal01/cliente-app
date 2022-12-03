import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './pages/listado/clientes.component';
import { FormComponent } from './pages/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './pages/paginator/paginator.component';

import { MaterialModule } from '../material/material.module';
import { DetalleComponent } from './pages/detalle/detalle.component';



@NgModule({
  declarations: [
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,

  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ClientesModule { }
