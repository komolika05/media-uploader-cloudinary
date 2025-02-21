import { NextResponse } from 'next/server';
import connectMongoDB from '@/utils/mongodb';
import Media from '@/models/Media';

export async function POST(request) {
  try {
    await connectMongoDB();
    const { url, name } = await request.json();
    
    const media = await Media.create({ url, name });
    return NextResponse.json({ media }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload media', details: error.message }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const media = await Media.find();
    return NextResponse.json({ media });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch media', details: error.message }, 
      { status: 500 }
    );
  }
}