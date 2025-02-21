'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ShowMedia({ initialMedia }) {
    const [mediaUrls, setMediaUrls] = useState(initialMedia || []);

    return (
        <div>
            <h1>Uploaded Media</h1>
            <div className="grid grid-cols-3 gap-4">
                {mediaUrls.map((media, index) => (
                    <div key={index} className="relative w-full h-64">
                        {media.path && (
                            <Image 
                                src={media.path} 
                                alt={media.filename || `Media ${index + 1}`} 
                                fill 
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}