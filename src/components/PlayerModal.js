import React from "react";
import PlayerProfileImage from "./PlayerProfileImage";
import bre1 from "../images/bre-1.JPG";
import bre2 from "../images/bre-2.JPG";
import bre3 from "../images/bre-3.JPG";
import bre4 from "../images/bre-4.JPG";
import erin1 from "../images/erin-1.JPG";
import erin2 from "../images/erin-2.PNG";
import erin3 from "../images/erin-3.png";
import erin4 from "../images/erin-4.JPG";
import jesse1 from "../images/jfole-1.JPEG";
import jesse2 from "../images/jfole-2.JPG";
import jesse3 from "../images/jfole-3.jpg";
import jesse4 from "../images/jfole-4.jpg";
import nate1 from "../images/nate-1.jpg";
import nate2 from "../images/nate-2.jpg";
import nate3 from "../images/nate-3.png";
import nate4 from "../images/nate-4.png";

function PlayerModal({ onClose, onSelectPicture }) {

    const pictureOptions = [
        { name: 'bre1', src: bre1 },
        { name: 'bre2', src: bre2 },
        { name: 'bre3', src: bre3 },
        { name: 'bre4', src: bre4 },
        { name: 'erin1', src: erin1 },
        { name: 'erin2', src: erin2 },
        { name: 'erin3', src: erin3 },
        { name: 'erin4', src: erin4 },
        { name: 'jesse1', src: jesse1 },
        { name: 'jesse2', src: jesse2 },
        { name: 'jesse3', src: jesse3 },
        { name: 'jesse4', src: jesse4 },
        { name: 'nate1', src: nate1 },
        { name: 'nate2', src: nate2 },
        { name: 'nate3', src: nate3 },
        { name: 'nate4', src: nate4 },
    ];

    const handlePictureSelection = (picture) => {
        onSelectPicture(picture);
        onClose();
    };

    return (
        <div className="PlayerModal">
            <div className="PlayerModal-row">
                {pictureOptions.slice(0, 4).map((option, index) => (
                    <PlayerProfileImage 
                        key={index} 
                        src={option.src} 
                        alt={`Profile Picture ${index + 1}`} 
                        onClick={() => handlePictureSelection(option.src)} 
                    />
                ))}
            </div>
            <div className="PlayerModal-row">
                {pictureOptions.slice(4, 8).map((option, index) => (
                    <PlayerProfileImage 
                        key={index} 
                        src={option.src} 
                        alt={`Profile Picture ${index + 1}`} 
                        onClick={() => handlePictureSelection(option.src)} 
                    />
                ))}
            </div>
            <div className="PlayerModal-row">
                {pictureOptions.slice(8, 12).map((option, index) => (
                    <PlayerProfileImage 
                        key={index} 
                        src={option.src} 
                        alt={`Profile Picture ${index + 1}`} 
                        onClick={() => handlePictureSelection(option.src)} 
                    />
                ))}
            </div>
            <div className="PlayerModal-row">
                {pictureOptions.slice(12, 16).map((option, index) => (
                    <PlayerProfileImage 
                        key={index} 
                        src={option.src} 
                        alt={`Profile Picture ${index + 1}`} 
                        onClick={() => handlePictureSelection(option.src)} 
                    />
                ))}
            </div>
        </div>
    )
}

export default PlayerModal;