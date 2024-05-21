import React from 'react';
import { useLocation } from 'react-router-dom';

function Game() {
    const location = useLocation();
    console.log(location)
    const { playerPictures } = location.state || {};

    return (
        <div className="Game">
            <h1>Game Component</h1>
            <div className="Game-players">
                {playerPictures && Object.entries(playerPictures).map(([playerNumber, picture], index) => (
                    <div key={index} className="Game-player">
                        <h2>Player {playerNumber}</h2>
                        <img src={picture} alt={`Player ${playerNumber}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Game;
