"use server";
import { revalidateTag } from "next/cache";

export async function customRevalidateTag(tag: string) {
  console.log("revalidating");

  revalidateTag(tag);
}
