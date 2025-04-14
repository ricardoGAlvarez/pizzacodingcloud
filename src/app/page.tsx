import { Card } from "@/components/ui/card";
import OrderItem from "./components/order-item";
import Orderlist from "./components/orderlist";
import Product from "./(pages)/product/page";

export default function Home() {
  return (
    <div className="flex flex-col items-center ">
      <Card className="flex flex-col p-4 md:w-4/12 w-10/12   m-4">
        <h2 className="text-2xl font-bold">Ordenes pendientes</h2>
        <Orderlist />
      </Card>
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
