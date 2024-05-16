import React, { useState } from "react";
import background from '../images/diagon-alley-background.jpg';
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="Home">
            <img src={background} alt="Hogwarts Background" className="Home-background"/>
            <div className="Home-header">
                <div className="Home-heading">
                    <span className="fast-flicker">H</span>arr
                    <span className="fast-flicker margin-right">y</span>Po
                    <span className="fast-flicker">t</span>te
                    <span className="fast-flicker margin-right">r</span>
                    <span className="fast-flicker">T</span>
                    ri<span className="fast-flicker">v</span>ia
                </div>
                <Link to={"/player-select"}>
                    <button className="Home-button hvr-grow-shadow">START</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;