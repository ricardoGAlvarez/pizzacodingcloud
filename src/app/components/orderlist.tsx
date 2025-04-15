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
import { orderList as OrderItem } from "../models/listOrders"; // Alias para evitar confusión con el nombre del componente
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Check } from "lucide-react";
import {v4 as uuidv4} from "uuid";
interface QuantityMap {
  [id: string]: number;
}

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
  const [orderList, setOrderList] = useState<OrderItem[]>([]);
  const [quantities] = useState<QuantityMap>({});

  useEffect(() => {
    const listOrder = JSON.parse(
      localStorage.getItem("listOrder") || "[]"
    ) as OrderItem[];
    setOrderList(listOrder);
  }, []);

  const calculateTotal = () => {
    return orderList
      .reduce((total, item) => {
        const quantity = quantities[item.id] || item.quantity || 1; // Usa la cantidad del item si está disponible
        return total + item.price * quantity;
      }, 0)
      .toFixed(2);
  };

  const completarOrden = async () => {
    if (orderList.length === 0) {
      console.log("No hay pedidos para completar.");
      return;
    }

    const orderId = uuidv4();
    let totalPedido = 0;
    const itemsUnificados = orderList.map((item) => {
      const quantity = quantities[item.id] || item.quantity || 1;
      totalPedido += item.price * quantity;
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantity,
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
      localStorage.setItem("listOrderComplete", JSON.stringify(pedidoUnificado));
      localStorage.removeItem("listOrder");
      window.location.reload(); 
    } catch (error) {
      console.error("Error al enviar la orden:", error);
    }
  };

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
          {orderList.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.name} X {item.quantity}
              </TableCell>
              <TableCell>{item.estado}</TableCell>
              <TableCell className="text-right">
                ${(item.price * (quantities[item.id] || item.quantity || 1)).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Card className="w-full flex">
        <div className=" flex justify-between items-center mx-5 gap-x-4">
          <strong>Total :${calculateTotal()}</strong>
          <Button
            onClick={() => {
              completarOrden();
            }}
            className="cursor-pointer bg-green-600 hover:bg-green-500"
          >
            <Check size={20} />
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Orderlist;