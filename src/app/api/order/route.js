
import dataOrders from '@/utils/dataOrders.JSON';
import { NextResponse } from 'next/server';
export async function GET() {
    return new NextResponse(JSON.stringify(dataOrders), { status: 200 });
}
