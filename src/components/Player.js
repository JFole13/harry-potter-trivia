import React, { useState } from "react";
import defaultProfile from "../images/default-profile.png";
import PlayerModal from "./PlayerModal";
import PlayerProfileImage from "./PlayerProfileImage";

function Player({ playerNumber }) {
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedPicture, setSelectedPicture] = useState(defaultProfile);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handlePictureSelection = (picture) => {
        setSelectedPicture(picture);
        setIsModalOpen(false);
    };

    return (
        <div className="Player">
            <div>
                {isModalOpen && <PlayerModal onClose={handleCloseModal} onSelectPicture={handlePictureSelection} />}
                <PlayerProfileImage src={ selectedPicture } alt= {"Profile Image"} onClick={handleOpenModal}/>
            </div>
            <h2>Player { playerNumber }</h2>
        </div>
    );
}

export default Player;