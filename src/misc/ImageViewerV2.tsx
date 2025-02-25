import { useState } from "react";


interface ImageViewerV2Props {
    src: string; // Type for the image source
}

const ImageViewerV2: React.FC<ImageViewerV2Props> = ({ src }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`relative flex justify-center items-center ${isHovered ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img 
                src={src} 
                alt="Image Viewer" 
                className={`transition-transform duration-300 ease-in-out  w-full h-auto`} 
            />
        </div>
    );
};

export default ImageViewerV2;