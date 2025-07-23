import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get userToken from query parameters
    const { searchParams } = new URL(request.url);
    const userToken = searchParams.get('userToken');

    if (!userToken) {
      return NextResponse.json(
        { error: 'userToken is required' },
        { status: 400 }
      );
    }

    // Find user by userToken
    const user = await prisma.user.findUnique({
      where: { userToken },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid userToken' },
        { status: 401 }
      );
    }

    // Fetch pages for the user
    const pages = await prisma.page.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        title: true,
      },
    });

    console.log(pages)
    return NextResponse.json({ pages }, { status: 200 });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userToken, title } = body;

    // Validate input
    if (!userToken) {
      return NextResponse.json(
        { error: 'userToken is required' },
        { status: 400 }
      );
    }

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'title is required and must be a string' },
        { status: 400 }
      );
    }

    // Find user by userToken
    const user = await prisma.user.findUnique({
      where: { userToken },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid userToken' },
        { status: 401 }
      );
    }

    // Create new page
    const page = await prisma.page.create({
      data: {
        userId: user.id,
        title: title || 'Untitled Page',
        isPublic: false,
      },
      select: {
        id: true,
        title: true,
      },
    });

    return NextResponse.json({ page }, { status: 201 });
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
