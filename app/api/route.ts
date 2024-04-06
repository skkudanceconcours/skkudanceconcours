import { getAllNotices } from "@/lib/firebase/firebaseCRUD";
export const dynamic = "force-dynamic"; // defaults to auto

export const DATA_PER_PAGE = 10;

export async function GET(request: Request) {
  try {
    console.log("fetchData");
    const data = await getAllNotices();
    if (data) {
      return { data: data, totalPages: Math.ceil(data.length / DATA_PER_PAGE) };
    }
  } catch (error) {
    console.log(`error fetching data: ${error}`);
  }
  return { data: [], totalPages: 0 };
}
