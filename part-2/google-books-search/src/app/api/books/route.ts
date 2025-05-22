import { NextResponse } from "next/server";
import axios from "axios";
import { GOOGLE_BOOKS_API } from "@/app/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const startIndex = searchParams.get("startIndex") || "0";
  const maxResults = searchParams.get("maxResults") || "10";

  try {
    const response = await axios.get(GOOGLE_BOOKS_API, {
      params: {
        q: query,
        startIndex,
        maxResults,
        key: process.env.GOOGLE_BOOKS_API_KEY,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Google Books API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 },
    );
  }
}
