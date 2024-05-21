import React, { useState } from "react";
import Player from './Player.js';
import defaultProfile from "../images/default-profile.png";
import { Link } from "react-router-dom";


// function PlayerSelect() {
//     const [selectedPlayerCount, setSelectedPlayerCount] = useState(1);
//     const [playerPictures, setPlayerPictures] = useState({});

//     const handlePlayerSelect = (count) => {
//         setSelectedPlayerCount(count);
//         setPlayerPictures({});
//     };

//     const handlePictureSelect = (playerNumber, picture) => {
//         setPlayerPictures(prevState => ({
//             ...prevState,
//             [playerNumber]: picture
//         }));
//     };

//     return (
//         <div className="PlayerSelect">
//             <div className="PlayerSelect-container">
//                 <h1 className="PlayerSelect-heading">How many players?</h1>
//                 <div>
//                     {[1, 2, 3, 4].map((count) => (
//                             <p
//                                 key={count}
//                                 className={`PlayerSelect-player-option hvr-grow-shadow ${selectedPlayerCount === count ? 'selected' : ''}`}
//                                 onClick={() => handlePlayerSelect(count)}>
//                                 {count}
//                             </p>
//                     ))}
//                 </div>
//                 {selectedPlayerCount && (
//                     <div className="PlayerSelect-players">
//                         <div className="PlayerSelect-player">
//                             {Array.from({ length: selectedPlayerCount }).map((_, index) => (
//                                 <Player key={index} playerNumber={index + 1} onPictureSelect={handlePictureSelect} />
//                             ))}
//                         </div>
//                         <Link to={"/start"}>
//                             <button className="PlayerSelect-button hvr-grow-shadow">Start Game</button>
//                         </Link>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

function PlayerSelect() {
    // const [selectedPlayerCount, setSelectedPlayerCount] = useState(4);
    // const [playerPictures, setPlayerPictures] = useState({defaultProfile, defaultProfile, defaultProfile, defaultProfile});

    // const handlePlayerSelect = (count) => {
    //     setSelectedPlayerCount(count);
    //     setPlayerPictures({});
    // };

    // const handlePictureSelect = (playerNumber, picture) => {
    //     setPlayerPictures(prevState => ({
    //         ...prevState,
    //         [playerNumber]: picture
    //     }));
    // };

    const [selectedPlayerCount, setSelectedPlayerCount] = useState(4);
    const [playerPictures, setPlayerPictures] = useState(() => {
        let initialPictures = {};
        for (let i = 1; i <= selectedPlayerCount; i++) {
            initialPictures[i] = defaultProfile;
        }
        return initialPictures;
    });

    const handlePlayerSelect = (count) => {
        setSelectedPlayerCount(count);
        let newPictures = {};
        for (let i = 1; i <= count; i++) {
            newPictures[i] = defaultProfile;
        }
        setPlayerPictures(newPictures);
    };

    const handlePictureSelect = (playerNumber, picture) => {
        setPlayerPictures(prevState => ({
            ...prevState,
            [playerNumber]: picture
        }));
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
                                <Player key={index} playerNumber={index + 1} onPictureSelect={handlePictureSelect} />
                            ))}
                        </div>
                        {console.log(playerPictures)}
                        <Link to={"/start"} state={{ playerPictures }}>
                            <button className="PlayerSelect-button hvr-grow-shadow">Start Game</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlayerSelect;