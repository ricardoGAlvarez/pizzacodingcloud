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
import { orderList } from "../models/order-list";
import { Card } from "@/components/ui/card";
import axios from "axios";

interface QuantityMap {
  [id: string]: number;
}

function OrderlistComplete() {
  const [orderList, setOrderList] = useState<orderList[]>([]);
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

  console.log(orderList);
  const calculateTotal = () => {
    return orderList
      .reduce((total, item) => {
        const quantity = quantities[item.id] || 1;
        return total + item.price * (quantities[item.id] || 1);
      }, 0)
      .toFixed(2);
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
                ${(item.price * item.quantity).toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
              Total :${calculateTotal()}            
              </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}

export default OrderlistComplete;
