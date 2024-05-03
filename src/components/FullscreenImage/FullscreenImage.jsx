import React, { useState } from 'react';
import './FullscreenImage.css'; // CSS file for fullscreen styling
import { FaTimes } from 'react-icons/fa';
import LoadingBar from "../LoadingComponent/LoadingComponent.jsx";

const FullscreenImage = ({ imageUrl, onClose }) => {
    const [loading, setLoading] = useState(true);

    // Function to handle image load event
    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <div className="fullscreen-image-container">
            <div className="fullscreen-image-overlay" onClick={onClose}>
                <button className="close-button" onClick={onClose}>
                    <FaTimes size={40} />  {/* إغلاق */}
                </button>
            </div>
            <div className="fullscreen-image-content">
                {loading && <LoadingBar />} {/* Render loading bar if image is still loading */}
                <img src={imageUrl} alt="Fullscreen" onLoad={handleImageLoad} />
            </div>
        </div>
    );
};

export default FullscreenImage;
