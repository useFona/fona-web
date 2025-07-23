import generateUserToken from '@/action/generateUserToken';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';


export async function PATCH() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newToken = generateUserToken();

    // Update user token in the database
    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { userToken: newToken },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'User token updated successfully',
        userToken: newToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user token:', error);
    return NextResponse.json(
      { error: 'Failed to update user token' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userToken = await prisma.user.findUnique({
      where: { id: session?.user?.id },
      select: { userToken: true },
    })

    return NextResponse.json({ userToken }, { status: 200 });

  } catch (error) {
    console.error('Error updating user token:', error);
    return NextResponse.json(
      { error: 'Failed to update user token' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
