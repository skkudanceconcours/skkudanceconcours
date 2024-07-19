import { getAllReception } from "@/lib/firebase/firebaseCRUD";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  try {
    const data = await getAllReception();
    return NextResponse.json({ data: data });
  } catch (error) {
    console.log(`error fetching data: ${error}`);
    return NextResponse.json({ data: [] });
  }
}
