"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {  ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { items } from "../models/products";
import axios from "axios";
import { toast } from "react-hot-toast";
function CardItem() {
  const [items, setItems] = useState<items[]>([]);

  //obtener los productos
  useEffect(() => {
    const response = axios.get("/api/product");
    response.then((res) => {
      setItems(res.data.product);
    });
  }, []);

 //agregar al carrito
  const handleAddToCart = (item: items) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItem = cartItems.find(
      (cartItem: any) => cartItem.id === item.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    toast.success("Se agrego producto al carrito");
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  return (
    <div className="">
      {items.length > 0 ? (
        <div className="grid md:grid-cols-2 gridcols-1 gap-2">
          {items.map((item) => (
            <Card key={item.id} className=" ">
              <div className="px-2 ">
                <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-700">{item.ingredients.join(", ")}</p>

                <div className="flex justify-between p-4 items-center">
                  <p className="text-gray-900 text-xl font-bold mt-2">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      className="bg-blue-700 flex items-center text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCartIcon className="w-4 h-4 " />
                      Agregar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-2">
          <h2 className="text-2xl font-semibold mb-2">
            No se encontro productos
          </h2>
          
        </Card>
      )}
    </div>
  );
}

export default CardItem;
