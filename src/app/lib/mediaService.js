import { connectDB } from './mongodb';
import Media from '../../models/Media';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function getMedia() {
    try {
        const files = await fs.readdir(UPLOAD_DIR);
        return files.map(file => ({
            filename: file,
            path: `/uploads/${file}`
        }));
    } catch (error) {
        console.error('Error reading media directory:', error);
        return [];
    }
}

export async function uploadMedia(file) {
    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Generate a unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '_');
    const filename = `${timestamp}_${originalName}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    // Read file buffer and write to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    try {
        await fs.writeFile(filePath, buffer);
        
        return {
            filename: filename,
            originalName: file.name,
            path: `/uploads/${filename}`,
            size: buffer.length
        };
    } catch (error) {
        console.error('File upload error:', error);
        throw new Error('Failed to save file');
    }
}
