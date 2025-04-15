import { NextResponse } from "next/server";
import dataProduct from '@/utils/dataProducts.JSON';

// Función para obtener un producto por su ID
export async function GET(request) {
    const parts = request.url.split("/");
    const id = parts[parts.length - 1];
    if (isNaN(id)) {
        return  NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    try {
        const product = dataProduct.find((item) => item.id === parseInt(id));
        if (!product) {
            return  NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        return  NextResponse.json(product);
    } catch (error) {
        return  NextResponse.json({ error: error.message }, { status: 500 });
    }


}