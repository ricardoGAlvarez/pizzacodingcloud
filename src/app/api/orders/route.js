import { NextResponse } from "next/server";

const orders = []; // Simulación de almacenamiento en memoria

export async function GET() {
  try {
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: "El cuerpo de la solicitud debe ser un array de órdenes." },
        { status: 400 }
      );
    }



    orders.push(...data); // Agrega todas las órdenes
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
