import React, { useState } from 'react';
import defaultProfile from "../images/default-profile.png";
import { useLocation } from 'react-router-dom';

function Game() {
    const location = useLocation();
    console.log(location.state)
    const { playerPictures } = location.state || {};


    return (
        <div className="Game">
            <div className="Game-players">
                {playerPictures && Object.entries(playerPictures).map(([playerNumber, picture], index) => (
                    <div key={index} className="Game-player">
                        <h2>Player {playerNumber}</h2>
                        <img src={picture || defaultProfile} alt={`Player ${playerNumber}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Game;
