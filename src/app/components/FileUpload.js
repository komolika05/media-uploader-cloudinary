'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/media', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('File uploaded successfully!');
                setFile(null);
                router.refresh(); // Refresh the page to show new media
            } else {
                const errorData = await response.json();
                alert(`Upload failed: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h2>Upload Media</h2>
            <form onSubmit={handleUpload}>
                <input 
                    type="file" 
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                />
                <button 
                    type="submit" 
                    disabled={!file || uploading}
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
}