import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
   try {
      const body = await request.json();

      const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';

      if (!backendUrl) {
         throw new Error("BACKEND_URL environment variable is not configured");
      }

      const backendResponse = await fetch(`${backendUrl}/proba`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(body),
      });

      if (!backendResponse.ok) {
         const errorData = await backendResponse.json().catch(() => ({}));
         throw new Error(
            errorData.message ||
            `Backend request failed with status ${backendResponse.status}`
         );
      }

      const responseData = await backendResponse.json();

      return NextResponse.json(responseData, { status: 200 });
   } catch (error) {
      console.error("Error processing form data:", error);

      return NextResponse.json(
         {
            success: false,
            message: "Failed to process form data",
            error: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
      );
   }
}
