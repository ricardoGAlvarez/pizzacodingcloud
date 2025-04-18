"use client";
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
import { orderComplete } from "../models/orderComplete";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function OrderlistComplete() {
  const [orderList, setOrderList] = useState<orderComplete[]>([]);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrderList(response.data.orders);
      } catch (error) {
        console.error("Error al obtener la lista de pedidos", error);
      }
    };
    fetchOrderList();
  }, []);
  const handleLimpiar = async () => {
    try {
      await axios.delete("/api/orders"); // Llama al backend para borrar las órdenes
      setOrderList([]); // Limpia el estado local también
      alert("Se eliminaron todas las órdenes exitosamente.");

    } catch (error) {
      console.error("Error al limpiar los pedidos", error);
    }
  };
  
  return (
    <div className="flex justify-center flex-col items-center ">
      <Button onClick={() => handleLimpiar()}>Limpiar pedidos</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Detalle</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-center">Total</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList.map((item) => (
            <TableRow key={item.orderId}>
              <TableCell>
                {item.items.map((item) => (
                  <div key={item.id}>
                    {item.name} - {item.quantity} x ${item.price}
                  </div>
                ))}
              </TableCell>
              <TableCell>{item.estado}</TableCell>

              <TableCell className="text-right">
                Total :${item.totalPedido}
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/order/${item.orderId}`}
                  className="cursor-pointer"
                >
                  <Eye />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrderlistComplete;
