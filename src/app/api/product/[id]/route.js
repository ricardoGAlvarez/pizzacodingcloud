import { NextResponse } from "next/server";
import dataProduct from '@/utils/dataProducts.JSON';

export async function GET(request) {
    const parts = request.url.split("/");
    const id = parts[parts.length - 1];
    if (isNaN(id)) {
        return new NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    try {
        const product = dataProduct.find((item) => item.id === parseInt(id));
        if (!product) {
            return new NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        return new NextResponse.json(product);
    } catch (error) {
        return new NextResponse.json({ error: error.message }, { status: 500 });
    }


}