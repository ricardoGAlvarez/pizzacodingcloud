import { Card } from "@/components/ui/card";
import OrderItem from "./components/order-item";
import Orderlist from "./components/orderlist";
import Product from "./(pages)/product/page";
import OrderlistComplete from "./components/order-complete";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center ">
      <div className="grid grid-cols-2">
      <Card className="flex flex-col p-4    m-4">
        <h2 className="text-2xl font-bold">Ordenes Pendientes</h2>
        <Orderlist />
      </Card>
      <Card className="flex flex-col p-4    m-4">
      <h2 className="text-2xl font-bold">Ordenes Completas</h2>
        
        <OrderlistComplete />
      </Card>
      </div>
      <div className="flex w-full md:flex-row flex-col-reverse items-center justify-center md:items-start mt-10 gap-x-2">
        <div className="md:w-full w-10/12 mt-4 md:mt-0 mx-2">
          <Product />
        </div>
        <div className="md:w-4/12 w-10/12">
          <OrderItem />
        </div>
      </div>
    </div>
  );
}
