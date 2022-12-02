import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Cliente } from '../../interfaces/interface';
import { ClienteService } from '../../services/cliente.service';


import Swal from 'sweetalert2'; //notificaciones mas bonitas


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  //Atributos
  titulo: string = "Formulario Cliente";
  public errores:string[] = [];



  cliente: Cliente ={
    nombre: '',
    apellido: '',
    email: '',
    id:0,
  };
  //Formulario reactivo
  formularioCliente: FormGroup = this.fb.group({
    nombre: ["", [Validators.required, Validators.minLength(3)]],
    apellido: ["", [Validators.required, Validators.minLength(3)]],
    email: ["correo@correo.com", [Validators.required, Validators.email]],
  });

  id!:number;
  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  cargarCliente(): void {
    //! para obtener parametros
    this.activatedRoute.params.subscribe(params => {
       this.id = params['id'];
      //console.log(id) undefined
      if(this.id){
        this.clienteService.getCliente(this.id).subscribe(cliente => {this.cliente = cliente;
        //!despues de obtener al cliente por el id
          this.formularioCliente.reset({
          ...this.cliente
        });})
      }
    })
  } 

  ngOnInit(): void {
    this.cargarCliente();
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

  update(): void{
    //! arreglar con clases
    this.cliente = this.formularioCliente.value;
    this.cliente.id = this.id; // como el formulario no cuenta con el id

      this.clienteService.update(this.cliente).subscribe(json =>{
        console.log("Cliente Actualizado");
        this.router.navigate(["/clientes"])
        Swal.fire('Cliente Actualizado', json.cliente.nombre + " " + json.cliente.apellido, 'success');
      },
      err => { //tambien se recibe el error :0 cuando logicamente o arrojamos 
          console.log(err, 'desde el componente' )
      });
  }

  //validaciones en el formulario de los campos 
  campoEsValido(campo: string){
    return this.formularioCliente.controls[campo].errors && this.formularioCliente.controls[campo].touched;
  }






}
