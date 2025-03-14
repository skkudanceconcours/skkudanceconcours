import { getAllReception } from "@/lib/firebase/firebaseCRUD";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  const params = useSearchParams();
  const year = params.get("year") as YearOption;
  try {
    const data = await getAllReception(year);
    return NextResponse.json({ data: data });
  } catch (error) {
    console.log(`error fetching data: ${error}`);
    return NextResponse.json({ data: [] });
  }
}
