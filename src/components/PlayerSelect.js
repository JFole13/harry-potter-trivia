import React, { useState } from "react";
import Player from './Player.js';

function PlayerSelect() {
    const [selectedPlayerCount, setSelectedPlayerCount] = useState(1);

    const handlePlayerSelect = (count) => {
        setSelectedPlayerCount(count);
    };

    return (
        <div className="PlayerSelect">
            <div className="PlayerSelect-container">
                <h1 className="PlayerSelect-heading">How many players?</h1>
                <div>
                    {[1, 2, 3, 4].map((count) => (
                            <p
                                key={count}
                                className={`PlayerSelect-player-option hvr-grow-shadow ${selectedPlayerCount === count ? 'selected' : ''}`}
                                onClick={() => handlePlayerSelect(count)}>
                                {count}
                            </p>
                    ))}
                </div>
                {selectedPlayerCount && (
                    <div className="PlayerSelect-players">
                        <div className="PlayerSelect-player">
                            {Array.from({ length: selectedPlayerCount }).map((_, index) => (
                                <Player key={index} playerNumber={index + 1} />
                            ))}
                        </div>
                        <button className="PlayerSelect-button hvr-grow-shadow">Start Game</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlayerSelect;