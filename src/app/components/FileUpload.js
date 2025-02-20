'use client';
import { useState } from 'react';

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.url) {
                setUploadedUrl(data.url);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        }

        setUploading(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {uploadedUrl && (
                <div>
                    <p>Uploaded Image:</p>
                    <img src={uploadedUrl} alt="Uploaded" width={200} />
                </div>
            )}
        </div>
    );
}