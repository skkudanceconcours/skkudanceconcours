import { getAllReception } from "@/lib/firebase/firebaseCRUD";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const year = searchParams.get("year") as YearOption;

  const allowedOrigins = ["https://skkudanceconcours.kr", "https://www.skkudanceconcours.kr"];
  const origin = req.headers.get("origin") ?? "";
  console.log("origin: ",origin);

  if (!allowedOrigins.includes(origin)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const data = await getAllReception(year);
    return NextResponse.json(
      { data: data },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    );
  } catch (error) {
    console.log(`error fetching data: ${error}`);
    return NextResponse.json({ data: [] });
  }
}
