import { NextResponse } from 'next/server';
import { getMedia, uploadMedia } from '../../lib/mediaService';

export async function GET() {
    const media = await getMedia();
    return NextResponse.json(media);
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const mediaItem = await uploadMedia(file);
        return NextResponse.json(mediaItem, { status: 201 });
    } catch (error) {
        console.error('Media upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
