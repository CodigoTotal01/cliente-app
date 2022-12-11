import { Component, OnInit } from '@angular/core';
import { Factura } from '../../models/factura';
import { ClienteService } from '../../../clientes/services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { FacturaService } from '../../services/factura.service';
import { Producto } from '../../models/producto';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemFactura } from '../../models/item-factura';
import Swal from 'sweetalert2';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
})
export class FacturaComponent implements OnInit {

  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();

  constructor(private clienteServices: ClienteService,
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService,
    private router: Router) { }


  autoCompleteControl = new FormControl('');
  // productos: string[] = ['Mesa', 'Tablet', 'Sambsun', 'Ariana'];
  productosFiltrados!: Observable<Producto[]>;

  //Al cargar el componente 

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId')!;
      this.clienteServices.getCliente(clienteId).subscribe(cliente =>
        this.factura.cliente = cliente
      );
    });

    // pruebita
    this.productosFiltrados = this.autoCompleteControl.valueChanges.pipe(
      //convertir los datos de n observable dentro de otro observavble 

      map((value: any | string) => typeof value === "string" ? value : value.nombre),
      flatMap(value => value ? this._filter(value) : []),// al inicio se envia un carecter vacio por eso la validacion 
    );

  }



  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    //el texto que se este escribiendo se hara en minusculas 
    return this.facturaService.filtrarProductos(filterValue);
  }

  //?   ? parametro opcional 
  mostrarNombre(producto?: Producto): string | any {
    return producto ? producto.nombre : '';
  }


  //evento de la seleccion que se disoparara 
  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto; // el valor que obtengamos lo setemamos o castemos como producto

    if (this.existeItem(producto.id!)) {
      this.incrementaCantidad(producto.id!);
    } else { // si no existe enmtonces generaremos un item 
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;

      this.factura.items.push(nuevoItem); // la factura tiene muchaos items 
    }



    this.autoCompleteControl.setValue(''); //cambiamos el valor del input con el form control 
    event.option.focus(); // receteamos 
    event.option.deselect(); //p ara quitar el que emos seleccionado para añadir mas pe 
  }


  actualizarCantidad(id: number, event: any) {

    let cantidad: number = event.target.value as number; //obtener el valor de un input si este cambia 

    if (cantidad <= 0) {
      return this.eliminarItem(id); // return para salir
    }

    //map cmtar valores d
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto?.id) {
        item.cantidad = cantidad;
      }
      return item; //literal solo cambiamos el valor de este dentro del arreglo 
    })
  }




  //!estas dudas parten desde la hora de ingresar asi que se añadiran ahi 
  //para cuando selccionemos un producto que ya exista -> solo incremente la cantidad mas no el producto 
  existeItem(id: number): boolean {
    let existe = false;
    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.producto?.id) {
        existe = true;
      }
    });

    return existe;
  }

  incrementaCantidad(id: number): void {
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto?.id) {
        ++item.cantidad; // preincrement 
      }
      return item; //literal solo cambiamos el valor de este dentro del arreglo 
    })
  }



  //Eliminar un elmento de la lista 
  eliminarItem(id: number): void {
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item?.producto?.id); //obtener todos los productos distintos al ide del item
  }

  //n orequieremos la factura porque la tenemos mapeada 

  create(facturaForm: any) {

    //! nota para mi -> baismaente al no tener string esolo ase invalido 
    console.log(this.factura)

    if(this.factura.items.length  == 0){
      this.autoCompleteControl.setErrors({'invelid': true})
    }

    if (facturaForm.form.valid && this.factura.items.length > 0) {

      this.facturaService.create(this.factura).subscribe(factura => {

        let descripcionFactura = factura.descripcion == null ? '' : factura.descripcion;

        Swal.fire(this.titulo, `Factura ${descripcionFactura} creada con exito`, 'success')
        this.router.navigate(['/clientes'])
      })

    }

  }

}
