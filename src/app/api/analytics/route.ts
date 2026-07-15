import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await request.text().catch(() => "");
  return new NextResponse(null, { status: 204 });
}
