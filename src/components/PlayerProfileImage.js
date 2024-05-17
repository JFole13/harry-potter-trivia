import React from "react";

function PlayerProfileImage({ src, alt, onClick}) {
    return (
        <img className="Player-profile-image Player-profile-image-selection" src={ src } alt= { alt } onClick={ onClick }/>
    )
}

export default PlayerProfileImage;