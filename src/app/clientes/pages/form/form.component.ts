import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Cliente, Region } from '../../interfaces/interface';
import { ClienteService } from '../../services/cliente.service';


import Swal from 'sweetalert2'; //notificaciones mas bonitas
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  //Atributos
  titulo: string = "Formulario Cliente";
  public errores: string[] = [];

  region!: Region;

  regiones: Region[] = [];


  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    id: 0,
    createAt: '',
    region: this.region,
    facturas: []
  };
  //Formulario reactivo
  formularioCliente: FormGroup = this.fb.group({
    nombre: ["", [Validators.required, Validators.minLength(3)]],
    apellido: ["", [Validators.required, Validators.minLength(3)]],
    email: ["correo@correo.com", [Validators.required, Validators.email]],
    createAt: ["", [Validators.required]],
    region: ['', Validators.required],
  });

  id!: number;
  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  cargarCliente(): void {
    //! para obtener parametros
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      //console.log(id) undefined
      if (this.id) {
        this.clienteService.getCliente(this.id).subscribe(cliente => {
          this.cliente = cliente;
          //!despues de obtener al cliente por el id
          this.formularioCliente.reset({
            ...this.cliente
          });
        })
      }
    });

    this.clienteService.getRegiones().subscribe(regiones => {
      this.regiones = regiones;
      console.log(this.regiones)
    })
  }

  ngOnInit(): void {
    this.cargarCliente();
    this.cliente
  }

  createCliente() {

    this.cliente = this.formularioCliente.value; //invbluyendo toda la info del formulario a el cliente actual 

    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        console.log("Cliente agregado");
        this.router.navigate(["/clientes"])
        Swal.fire('Nuevo Cliente', cliente.nombre + " " + cliente.apellido, 'success');
      },
      err => { //tambien se recibe el error :0 cuando logicamente o arrojamos 
        this.errores = err.error.errors as string[]; // converstir tipos de datos any a otro 
        console.log(this.errores)
      }
    )
  }

  update(): void {
    //! arreglar con clases
    this.cliente = this.formularioCliente.value;
    this.cliente.id = this.id; // como el formulario no cuenta con el id

    //! las facturas no ecitaran sus facturas 
    this.cliente.facturas = null!; // nos interesa editar al cliente no a sus facturas 
    

    this.clienteService.update(this.cliente).subscribe(json => {
      console.log("Cliente Actualizado");
      this.router.navigate(["/clientes"])
      Swal.fire('Cliente Actualizado', json.cliente.nombre + " " + json.cliente.apellido, 'success');
    },
      err => { //tambien se recibe el error :0 cuando logicamente o arrojamos 
        console.log(err, 'desde el componente')
      });
  }

  //validaciones en el formulario de los campos 
  campoEsValido(campo: string) {
    return this.formularioCliente.controls[campo].errors && this.formularioCliente.controls[campo].touched;
  }


  //de la recion, de la region del client 
  comprarRegion(o1: Region, o2: Region): boolean {

    return o1 === null || o2 === null ? false : o1.id === o2.id;
  }




}
