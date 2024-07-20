import { getAllNotices } from "@/lib/firebase/firebaseCRUD";
import { DATA_PER_PAGE } from "@/public/constants";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  try {
    const data = await getAllNotices();
    if (!data) return NextResponse.json({ data: [] });
    return NextResponse.json({ data: data });
  } catch (error) {
    console.log(`error fetching data: ${error}`);
    return NextResponse.json({ data: [] });
  }
}
