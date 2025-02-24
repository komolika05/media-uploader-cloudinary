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
                const response = await fetch('/api/media');
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
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-bold mb-3">Media Uploader</h1>
            <div>
                <button className="mr-3" onClick={() => setActiveTab('upload')}>Upload New Media</button>
                <button onClick={() => setActiveTab('list')}>View Uploaded Media</button>
            </div>
            {activeTab === 'upload' && <FileUpload />}
            {activeTab === 'list' && <ShowMedia initialMedia={media} />}
        </div>
    );
}
