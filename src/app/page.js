'use client';
import { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import ShowMedia from './components/ShowMedia';

export default function Home() {
    const [activeTab, setActiveTab] = useState('upload');
    const [media, setMedia] = useState([]);

    useEffect(() => {
        async function fetchMedia() {
            try {
                const response = await fetch('/api/media'); // Fetch from API route
                const data = await response.json();
                setMedia(data);
            } catch (error) {
                console.error('Error fetching media:', error);
            }
        }
        if (activeTab === 'list') {
            fetchMedia();
        }
    }, [activeTab]);

    return (
        <div>
            <h1>Media Uploader</h1>
            <div>
                <button onClick={() => setActiveTab('upload')}>Upload New Media</button>
                <button onClick={() => setActiveTab('list')}>View Uploaded Media</button>
            </div>
            {activeTab === 'upload' && <FileUpload />}
            {activeTab === 'list' && <ShowMedia initialMedia={media} />}
        </div>
    );
}
