import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { reorderTasks } from '@/actions/task';

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { orderedIds } = body as { orderedIds: string[] };

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ success: false, message: 'Invalid body' }, { status: 400 });
    }

    await reorderTasks(session.user.id, orderedIds);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in reorder route:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
