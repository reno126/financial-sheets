// export const dynamic = 'force-static';

import { FETCH_CONFIG } from '@/client/constants';
import { createUri } from '@/helpers/createUri';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug: slug } = await params;
  const uri = createUri(process.env.API_HOST as string, slug, request.nextUrl.searchParams);

  try {
    const response = await fetch(uri, {
      ...FETCH_CONFIG,
    });

    if (!response.ok) {
      return NextResponse.json(response.statusText, { status: response.status });
    }

    const jsonResponse = await response.json();
    return NextResponse.json(jsonResponse, { status: 200 });
  } catch (e) {
    console.log(e);
    const message = e instanceof Error ? e.message : '';
    return NextResponse.json(message, { status: 500 });
  }
}
