import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { cookieName, cookieValue } = await req.json();

    if (!cookieName || !cookieValue) {
      return new NextResponse('Missing cookie name or value', { status: 400 });
    }

    const response = new NextResponse('Cookie set successfully');
    response.cookies.set(cookieName, cookieValue, { path: '/' });

    return response;
  } catch (error) {
    return new NextResponse(`Error setting cookie: ${error}`, { status: 500 });
  }
}