import dataProduct from "@/utils/dataProducts.JSON";
import { NextResponse } from "next/server";


// Función para obtener todos los productos
export async function GET() {
  try {
    const product = dataProduct;
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
