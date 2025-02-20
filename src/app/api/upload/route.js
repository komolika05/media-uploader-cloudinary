import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import {v2 as cloudinary} from 'cloudinary';


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'uploads' },
                (error, result) => {
                    if (error) {
                        console.error(error);
                        resolve(NextResponse.json({ error: 'Upload failed' }, { status: 500 }));
                    } else {
                        resolve(NextResponse.json({ url: result.secure_url }, { status: 200 }));
                    }
                }
            );

            const stream = Readable.from(buffer);
            stream.pipe(uploadStream);
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 501 });
    }
}