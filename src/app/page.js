import FileUpload from "./components/FileUpload";

export default function Home() {
    return (
        <div className="p-4 flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Upload media to cloudinary</h1>
            <FileUpload />
        </div>
    );
}