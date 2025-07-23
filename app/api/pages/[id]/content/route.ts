import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Validation schema for Editor.js content
const contentSchema = z.object({
  content: z.record(z.any()), // Editor.js JSON is a flexible object
});

// GET: Fetch note content for a page
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
      include: {
        notes: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found or unauthorized" }, { status: 404 });
    }

    // Return note content or empty Editor.js content
    const noteContent = page.notes[0]?.content || { blocks: [] };
    console.log(noteContent)
    return NextResponse.json({ content: noteContent }, { status: 200 });
  } catch (error) {
    console.error("Error fetching page content:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    // Get session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate request body
    const body = await request.json();
    const { content } = contentSchema.parse(body);

    // Check if page exists and belongs to user
    const page = await prisma.page.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
      include: {
        notes: {
          select: { id: true },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ error: "Page not found or unauthorized" }, { status: 404 });
    }

    // Run in a transaction
    const note = await prisma.$transaction(async (tx) => {
      // Check if a note exists for this page
      const existingNote = await tx.note.findFirst({
        where: {
          pageId: id,
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (existingNote) {
        // Update existing note
        return await tx.note.update({
          where: {
            id: existingNote.id,
          },
          data: {
            content,
            updatedAt: new Date(), // Explicitly set updatedAt
          },
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      } else {
        // Create new note
        return await tx.note.create({
          data: {
            id: crypto.randomUUID(),
            pageId: id,
            content,
          },
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      }
    });

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    console.log(timeString) 
    return NextResponse.json({ note }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error syncing page content:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
