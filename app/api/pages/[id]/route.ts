import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Validation schema for updating a page
const updatePageSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  isPublic: z.boolean().optional(),
});

// Define route parameters type
interface RouteParams {
  params: Promise<{ id: string }>;
}
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    // Get session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if page exists and belongs to user
    const page = await prisma.page.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ page }, { status: 200 });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH: Update a page by ID
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    // Get session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate request body
    const body = await request.json();
    const { title, isPublic } = updatePageSchema.parse(body);

    // Check if page exists and belongs to user
    const page = await prisma.page.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found or unauthorized" }, { status: 404 });
    }

    // Update page
    const updatedPage = await prisma.page.update({
      where: { id: id },
      data: {
        title: title ?? page.title,
        isPublic: isPublic ?? page.isPublic,
      },
      select: {
        id: true,
        title: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ page: updatedPage }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error updating page:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE: Delete a page by ID
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    // Get session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if page exists and belongs to user
    const page = await prisma.page.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found or unauthorized" }, { status: 404 });
    }

    // Delete page
    await prisma.page.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Page deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
