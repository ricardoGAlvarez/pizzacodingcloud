export interface orderComplete{
    orderId: number;
    items: [{
        id: number;
        name: string;
        price: number;
        quantity: number
    }];
    totalPedido: number;
    estado: string
 
}