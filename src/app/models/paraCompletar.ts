export interface Producto {
    id: number;
    name: string;
    price: number;
    quantity: number;
    ingredients: string[];
  }
  
  export interface Pedido {
    id: number;
    estado: string;
    items: Producto[];
    total?: number; // opcional, porque no aparece en tu JSON actual
  }
  