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

interface QuantityMap {
  [id: string]: number;
}

function Orderlist() {
  const [orderList, setOrderList] = useState<orderList[]>([]);
  const [quantities, setQuantities] = useState<QuantityMap>({});

  useEffect(() => {
    const listOrder = JSON.parse(
      localStorage.getItem("listOrder") || "[]"
    ) as orderList[];
    setOrderList(listOrder);
  }, []);
  const calculateTotal = () => {
    return orderList
      .reduce((total, item) => {
        const quantity = quantities[item.id] || 1;
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const completarOrden = () => {
    localStorage.removeItem("listOrder") ;
    window.location.reload();
    alert("Orden completada");
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Card className="w-full flex">
        <div className="0 flex justify-between items-center mx-auto gap-x-4">
          <strong>Total :${calculateTotal()}</strong>
          <Button onClick={() => {completarOrden()}}>Completar</Button>
        </div>
      </Card>
    </div>
  );
}

export default Orderlist;
