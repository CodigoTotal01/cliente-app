import { Factura } from '../../facturas/models/factura';
export interface Cliente {
    id?: number ;
    nombre: string;
    apellido: string;
    createAt?: string;
    email: string;
    foto?:string;
    region?: Region;
    facturas: Factura[];
}


export interface Region{
    id?: number ;
    nombre: string;
}
