import { NextResponse } from "next/server";

// Array para almacenar las órdenes en memoria
export const orders = [];

// Función para obtener todas las órdenes
export async function GET() {
  try {
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Función para crear una nueva orden
export async function POST(request) {
  try {
    const data = await request.json();

    // Validamos que el cuerpo de la solicitud tenga la estructura correcta
    if (
      typeof data !== "object" ||
      data === null ||
      !data.items ||
      !Array.isArray(data.items)
    ) {
      return NextResponse.json(
        {
          error:
            "Error al crear la orden. La estructura del cuerpo de la solicitud no es válida.",
        },
        { status: 400 }
      );
    }

    // Extraemos las propiedades de la orden
    const { orderId, totalPedido, items, estado } =
      data;

    // Guardamos la nueva orden
    // En este ejemplo, simplemente la agregamos al array 'orders' en memoria

    const nuevaOrdenUnificada = {
      orderId,
      totalPedido,
      items,
      estado,
    };
    orders.push(nuevaOrdenUnificada);
    // Respuesta exitosa
    return NextResponse.json(
      {
        message: "Orden completada y guardada exitosamente.",
        order: nuevaOrdenUnificada,
      },
      { status: 200 }
    );
  } catch (error) {
    // Respuesta de error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
