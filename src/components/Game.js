import React, { useState } from 'react';
import defaultProfile from "../images/default-profile.png";
import { useLocation } from 'react-router-dom';

function Game() {
    const location = useLocation();
    console.log(location.state)
    const { playerPictures } = location.state || {};




    return (
        <div className="Game">
            <div className='Game-players left-gradient'>
                {playerPictures && Object.entries(playerPictures).slice(0,2).map(([playerNumber, picture], index) => (
                    <div key={index} className="Game-player">
                        <img src={picture || defaultProfile} alt={`Player ${playerNumber}`} className="Game-profile-picture" />
                        <p className='Game-player-score'>12</p>
                    </div>
                ))}
            </div>
            <div className="Game-board">
                <h1 className='hey'>Example Question</h1>
            </div>
            <div className='Game-players right-gradient'>
                {playerPictures && Object.entries(playerPictures).slice(2,4).map(([playerNumber, picture], index) => (
                    <div key={index} className="Game-player">
                        <img src={picture || defaultProfile} alt={`Player ${playerNumber}`} className="Game-profile-picture" />
                        <p className='Game-player-score'>14</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Game;
