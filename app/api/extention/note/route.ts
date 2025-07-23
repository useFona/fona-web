import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Retry function for handling transaction failures
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 2
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt <= maxRetries) {
        console.warn(`Retry ${attempt}/${maxRetries} failed:`, error);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }
  throw lastError;
}

function convertToEditorJsFormat(note: any) {
  const { id, data, type, timestamp } = note;

  switch (type) {
    case 'h1':
      return {
        id,
        type: 'Header',
        data: {
          text: data.text,
          level: 1
        }
      };

    case 'subheading':
      return {
        id,
        type: 'Header',
        data: {
          text: data.text,
          level: 3
        }
      };

    case 'paragraph':
      return {
        id,
        type: 'paragraph',
        data: {
          text: data.text
        }
      };

    default:
      return {
        id,
        type,
        data
      };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { userToken, pageId, noteData } = body;

    // Validate input
    if (!userToken || !pageId || !noteData) {
      return NextResponse.json(
        { status: 'error', message: 'userToken, pageId, and noteData are required' },
        { status: 400 }
      );
    }

    // Normalize noteData to always be an array
    const rawBlocks = Array.isArray(noteData) ? noteData : [noteData];

    // Validate each block in noteData
    for (const block of rawBlocks) {
      if (!block.id || !block.type || !block.data || typeof block !== 'object') {
        return NextResponse.json(
          { status: 'error', message: 'Each noteData block must contain id, type, and data fields' },
          { status: 400 }
        );
      }
    }

    // Convert extension format to Editor.js format
    const blocks = rawBlocks.map(convertToEditorJsFormat);

    // Find user by userToken
    const user = await prisma.user.findUnique({
      where: { userToken },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid userToken' },
        { status: 401 }
      );
    }

    // Verify page exists and belongs to the user
    const page = await prisma.page.findUnique({
      where: { id: pageId, userId: user.id },
      select: { id: true },
    });

    if (!page) {
      return NextResponse.json(
        { status: 'error', message: 'Page not found or not owned by user' },
        { status: 404 }
      );
    }

    // Perform note creation/update in a transaction with retries
    await withRetry(async () => {
      return prisma.$transaction(async (tx) => {
        // Check if a note exists for the page
        const existingNote = await tx.note.findFirst({
          where: { pageId },
          select: { id: true, content: true },
        });

        if (existingNote) {
          // Case 1: Existing note - append blocks
          const currentContent = existingNote.content as {
            time: number;
            blocks: any[];
            version: string;
          };

          // Append all blocks from noteData to existing blocks
          const updatedContent = {
            ...currentContent,
            time: Date.now(),
            blocks: [...currentContent.blocks, ...blocks],
          };

          // Update existing note
          await tx.note.update({
            where: { id: existingNote.id },
            data: {
              content: updatedContent,
              updatedAt: new Date(),
            },
          });
        } else {
          // Case 2: No existing note - create new note
          const newContent = {
            time: Date.now(),
            blocks: blocks,
            version: '2.31.0-rc.7', // Mimic Editor.js structure
          };

          // Create new note
          await tx.note.create({
            data: {
              pageId,
              content: newContent,
            },
          });
        }
      });
    });

    return NextResponse.json({ status: 'success' }, { status: 201 });
  } catch (error) {
    console.error('Error processing note:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
