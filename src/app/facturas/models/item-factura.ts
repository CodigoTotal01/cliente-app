import { Producto } from './producto';

export class ItemFactura {
    public id?:number;
    public producto?:Producto;
    public cantidad:number = 1;  //valor por defecto 
    public importe?: number;

    //metodo propio para calcular el importe en el frond end 


    public calcularImporte(): number{
        return this.cantidad*this.producto?.precio!;
    }

}
