import { ItemFactura } from './item-factura';
//d0s para salir, una para entrar a un archivo dentro de la carpeta 
import { Cliente } from '../../clientes/interfaces/interface';
export class Factura {
    public id?: number;
    public descripcion?: string; //puede 
    public observacion?: string;
    public items: ItemFactura[] = [];
    //recuerda que obtenemos el id del cliente en la factura 
    public cliente?: Cliente;
    public total?: number;
    public createAt?: string;

    calcularGranTotal(): number {
        this.total = 0;
        this.items.forEach((item: ItemFactura) => {
            this.total! += item.calcularImporte();
        })
        return this.total;
    }

}
