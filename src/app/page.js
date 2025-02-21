import { connectDB } from './lib/mongodb';
import Media from '../models/Media';
import ShowMedia from './components/ShowMedia';

export default async function Home() {
    await connectDB();
    
    try {
        const dbMedia = await Media.find({})
            .sort({ uploadedAt: -1 })
            .limit(100);

        return <ShowMedia initialMedia={dbMedia.map(media => ({
            url: media.url,
            name: media.name
        }))} />;
    } catch (error) {
        console.error('Error fetching media:', error);
        return <div>Error loading media</div>;
    }
}