"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Check } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Pedido, Producto} from "../models/paraCompletar";

interface UnifiedOrder {
  orderId: string;
  totalPedido: number;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  estado: "Completado";
}

function Orderlist() {
  const [orderList, setOrderList] = useState<Pedido[]>([]);

  useEffect(() => {
    const listOrder = JSON.parse(
      localStorage.getItem("listOrder") || "[]"
    ) as Pedido[];
    setOrderList(listOrder);
  }, []);

  const completarOrden = async (pedidoId: number, orderList: Pedido[]) => {
    const pedidoSeleccionado = orderList.find((pedido) => pedido.id === pedidoId);
  
    if (!pedidoSeleccionado) {
      console.log("Pedido no encontrado.");
      return;
    }
  
    const orderId = uuidv4();
    let totalPedido = 0;
  
    const itemsUnificados: Producto[] = pedidoSeleccionado.items.map((item) => {
      const quantity = item.quantity || 1;
      totalPedido += item.price * quantity;
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantity,
        ingredients: item.ingredients,
      };
    });
  
    const pedidoUnificado: UnifiedOrder = {
      orderId: orderId,
      totalPedido: parseFloat(totalPedido.toFixed(2)),
      items: itemsUnificados,
      estado: "Completado",
    };
  
    try {
      await axios.post("/api/orders", pedidoUnificado);
      localStorage.setItem(
        "listOrderComplete",
        JSON.stringify(pedidoUnificado)
      );
      eliminarPedidoPendiente(pedidoId, "listOrder"); 
      window.location.reload();
    } catch (error) {
      console.error("Error al enviar la orden:", error);
    }
  };
  
  function eliminarPedidoPendiente(idAEliminar: number, claveOrdenesPendientes: string) {
    const listaOrdenesString = localStorage.getItem(claveOrdenesPendientes);
  
    if (listaOrdenesString) {
      try {
        const listaOrdenes: Pedido[] = JSON.parse(listaOrdenesString);
        const nuevaListaOrdenes = listaOrdenes.filter((pedido) => pedido.id !== idAEliminar);
        localStorage.setItem(claveOrdenesPendientes, JSON.stringify(nuevaListaOrdenes));
        return true;
      } catch (error) {
        console.error("Error al parsear la lista de órdenes pendientes:", error);
        return false;
      }
    } else {
      console.log(`No se encontró la lista de órdenes pendientes con clave: ${claveOrdenesPendientes}`);
      return false;
    }
  }
  return (
    <div className="flex justify-center flex-col items-center ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Detalle</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList.map((pedido) => (
            <TableRow key={pedido.id}>
              <TableCell>
                {pedido.items.map((producto:any) => (
                  <div key={producto.id}>
                    {producto.name} x {producto.quantity}
                  </div>
                ))}
              </TableCell>
              <TableCell>{pedido.estado}</TableCell>
              <TableCell className="text-right">${pedido.total}</TableCell>
              <TableCell className="text-right">
              <Button
            onClick={() => {
              completarOrden(pedido.id as number, orderList);
            }}
            className="cursor-pointer bg-green-600 hover:bg-green-500 w-10 h-6"
          >
            <Check size={16} />
          </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Orderlist;
