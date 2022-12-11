import { Factura } from '../facturas/models/factura';
export class Usuario {
    public id?: number;
    public username?: string;
    public password?: string;
    public nombre?: string;
    public apellido?: string;
    public email?: string;
    public roles: string[] =[]; 
}
