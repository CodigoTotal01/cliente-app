import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturasRoutingModule } from './facturas-routing.module';
import { DetalleFacturaComponent } from './pages/detalle-factura/detalle-factura.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [
    DetalleFacturaComponent,
    FacturaComponent
  ],
  imports: [
    CommonModule,
    FacturasRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class FacturasModule { }
