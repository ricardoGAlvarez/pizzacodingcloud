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

interface QuantityMap {
  [id: string]: number;
}

function OrderlistComplete() {
  const [orderList, setOrderList] = useState<orderComplete[]>([]);
  const [quantities] = useState<QuantityMap>({});

  useEffect(() => {
   const fetchOrderList = async () => {
    try {
      const response = await axios.get("/api/orders");
      setOrderList(response.data.orders);
    } catch (error) {
      console.error("Error al obtener la lista de pedidos", error);
    }
   }
    fetchOrderList();
  }, []);


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
            <TableRow key={item.orderId}>
              <TableCell>
                {
                  item.items.map((item) => (
                    <div key={item.id}>
                      {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                    </div>
                  ))
                }
              </TableCell>
              <TableCell>{item.estado}</TableCell>

              <TableCell className="text-right">
              Total :${item.totalPedido.toFixed(2)}            
              </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}

export default OrderlistComplete;
