import React from 'react';
import './FullscreenImage.css'; // CSS file for fullscreen styling
import { FaTimes } from 'react-icons/fa';

const FullscreenImage = ({ imageUrl, onClose }) => {
    return (
        <div className="fullscreen-image-container">
            <div className="fullscreen-image-overlay" onClick={onClose}>
            <button className="close-button" onClick={onClose}>
                    <FaTimes size={30} /> إغلاق {/* Close icon */}
                </button>
            </div>
            <div className="fullscreen-image-content">
                <img src={imageUrl} alt="Fullscreen" />

            </div>
        </div>
    );
};

export default FullscreenImage;
