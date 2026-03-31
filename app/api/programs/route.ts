import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const programs = await db.collection('programs').find({}).toArray();
    return NextResponse.json({ success: true, data: programs });
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch programs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, duration, university, description } = body;

    if (!name || !duration) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection('programs').insertOne({
      name,
      duration,
      university: university || '',
      description: description || '',
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, data: { _id: result.insertedId, name, duration, university, description } });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ success: false, error: 'Failed to create program' }, { status: 500 });
  }
}
