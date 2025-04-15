"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Item = {
  name: string;
  quantity: number;
  price: number;
};

type Orden = {
  orderId: string;
  totalPedido: number;
  items: Item[];
  estado: string;
};

function OrderDetail() {
  const params = useParams();
  const id = params.id as string;

  const [orden, setOrden] = useState<Orden | null>(null);

  useEffect(() => {
    const response = localStorage.getItem("listOrderComplete");

    if (response) {
      const data = JSON.parse(response);

      // Si `listOrderComplete` es un array, filtramos por ID
      if (Array.isArray(data)) {
        const encontrada = data.find((o: Orden) => o.orderId === id);
        setOrden(encontrada || null);
      } else {
        // Si es solo una orden (como tu ejemplo anterior), comparamos directo
        if (data.orderId === id) {
          setOrden(data);
        }
      }
    }
  }, [id]);

  if (!orden) return <div>No se encontró la orden con ID: {id}</div>;

  return (
    <div className="flex justify-center mt-10">
        <Card className="w-[400px]">
    <CardHeader>
      <CardTitle>Detalle de la Orden<br /> #{orden.orderId}</CardTitle>
      <CardDescription>Información detallada de tu pedido.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Total:</p>
        <p className="text-lg font-semibold">$ {orden.totalPedido}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Estado:</p>
        <span>{orden.estado}</span>
      </div>


      <h3 className="text-lg font-semibold">Productos de la orden:</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead className="text-right">Cantidad</TableHead>
            <TableHead className="text-right">Precio Unitario</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orden.items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">$ {item.price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2} className="font-semibold">Total</TableCell>
            <TableCell className="text-right font-semibold">$ {orden.totalPedido}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
    </div>
  );
}

export default OrderDetail;
