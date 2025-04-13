
import dataProduct from '@/utils/dataProducts.JSON';
import { NextResponse } from 'next/server';
export async function GET() {
    return new NextResponse(JSON.stringify(dataProduct), { status: 200 });
}
