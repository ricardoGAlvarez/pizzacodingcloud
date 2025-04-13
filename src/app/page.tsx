
import CardItem from "./components/card-item";
import OrderItem from "./components/order-item";

export default function Home() {


  return (
    <div className="flex w-full md:flex-row flex-col-reverse items-center justify-center md:items-start mt-10 gap-x-2">
        <div className="md:w-full w-10/12 mt-4 md:mt-0 mx-2">
        <CardItem />
        </div>
        <div className="md:w-4/12 w-10/12">
        <OrderItem  />
        </div>
    </div>
  );
}