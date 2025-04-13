"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { orderItem } from "../models/item-order";

interface QuantityMap {
  [id: string]: number;
}

function OrderItem() {
  const [itemsOrder, setItemsOrder] = useState<orderItem[]>([]);
  const [quantities, setQuantities] = useState<QuantityMap>({});

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]") as orderItem[];
    setItemsOrder(cartItems);
    // Inicializa las cantidades al cargar los items
    const initialQuantities: QuantityMap = {};
    cartItems.forEach(item => {
      initialQuantities[item.id] = item.quantity || 1; // Usa la cantidad del item si existe, sino 1
    });
    setQuantities(initialQuantities);
  }, []);

  useEffect(() => {
    // Actualiza el localStorage cuando cambia la cantidad de los items
    const updatedCartItems = itemsOrder.map(item => ({
      ...item,
      quantity: quantities[item.id] || 1,
    }));
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  }, [quantities, itemsOrder]);

  const handleIncrement = (id: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[id] || 0;
      return {
        ...prevQuantities,
        [id]: Math.max(1, currentQuantity - 1),
      };
    });
  };

  const handleQuantityChange = (id: string, value: string) => {
    const quantity = parseInt(value);
    if (!isNaN(quantity) && quantity > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: quantity,
      }));
    }
  };

  const calculateTotal = () => {
    return itemsOrder.reduce((total, item) => {
      const quantity = quantities[item.id] || 1;
      return total + item.price * quantity;
    }, 0).toFixed(2);
  };

  return (
    <Card className="bg-white p-4 rounded-lg shadow-md w-full">
      {itemsOrder.length > 0 ? (
        <div>
          {itemsOrder.map((item) => (
            <div key={item.id} className="mb-4 pb-5 border-b border-gray-300">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-xl">{item.name}</span>
                  <p className="text-gray-600">{item.ingredients.join(", ")}</p>
                </div>
                <div className="flex  flex-col items-end">
                  <strong className="text-xl">${item.price?.toFixed(2)}</strong>
                  <div className="flex gap-x-3 items-center justify-end mt-2">
                    <span>Cantidad:</span>
                    <input
                      type="number"
                      className="border rounded p-1 w-16 text-center"
                      value={quantities[item.id] || 1}
                      min="1"
                      onChange={(e) => handleQuantityChange(item.id.toString(), e.target.value)}
                    />
                    <Button onClick={() => handleIncrement(item.id.toString())}>+</Button>
                    <Button onClick={() => handleDecrement(item.id.toString())}>-</Button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="flex text-center"><strong className="font-bold text-lg">No hay items en el pedido</strong></div>
      )}

      <div className="mt-6 py-2 border-t border-gray-300 flex justify-between items-center">
        <span className="font-bold text-xl">TOTAL:</span>
        <span className="font-bold text-xl"><strong>${calculateTotal()}</strong></span>
      </div>
      {itemsOrder.length > 0 ? (
        <Button className="bg-blue-600 mt-10 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-500 transition duration-200 w-full">
          Realizar Pedido
        </Button>
      ) : (
        <Button disabled className="bg-blue-600 mt-10 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-500 transition duration-200 w-full">
          Cargue Productos a su Pedido
        </Button>
      )}
    </Card>
  );
}

export default OrderItem;