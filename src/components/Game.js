import React, { useState, useEffect } from 'react';
import defaultProfile from "../images/default-profile.png";
import { useLocation } from 'react-router-dom';

const questions = [
    { question: "What is the capital of France?", answers: ["Milan", "Paris", "New York", "Your mom"]},
    { question: "What is 2 + 2?", answers: ["4", "5", "6", "7"] },
    { question: "What is the largest planet?", answers: ["Mars", "Earth", "Jupiter", "Pluto"] },
    // Add more questions as needed
  ];

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function Game() {
    const location = useLocation();
    const { playerPictures } = location.state || {};
    const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [shuffledQuestions, setShuffledQuestions] = useState(questions);

    const playersArray = playerPictures ? Object.entries(playerPictures) : [];

    useEffect(() => {
        // Randomly select a starting player
        const initialPlayerIndex = Math.floor(Math.random() * playersArray.length);
        setSelectedPlayerIndex(initialPlayerIndex);
    }, [playersArray.length]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentQuestionIndex((prevIndex) =>
                prevIndex + 1 < questions.length ? prevIndex + 1 : 0
            );
            // Rotate to the next player
            setSelectedPlayerIndex((prevIndex) =>
                (prevIndex + 1) % playersArray.length
            );
        }, 5000); // Change question every 5 seconds

        return () => clearTimeout(timer);
    }, [currentQuestionIndex, playersArray.length]);

    useEffect(() => {
        setShuffledQuestions(prevQuestions =>
          prevQuestions.map(question => ({
            ...question,
            answers: shuffleArray([...question.answers])
          }))
        );
      }, [currentQuestionIndex]);

    return (
        <div className="Game">
            <div className='Game-players left-gradient'>
                {playersArray.slice(0, 2).map(([playerNumber, picture], index) => (
                    <div
                        key={index}
                        className={`Game-player ${selectedPlayerIndex === index ? 'selected' : ''}`}
                    >
                        <img src={picture || defaultProfile} alt={`Player ${playerNumber}`} className="Game-profile-picture" />
                        <p className='Game-player-score'>12</p>
                    </div>
                ))}
            </div>
            <div className="Game-board">
                <h1 className='Game-question'>{questions[currentQuestionIndex].question}</h1>
                <div className='Game-answers'>
                    <div className='Game-answer'><h2 className='Game-answer-text'>{shuffledQuestions[currentQuestionIndex].answers[0]}</h2></div>
                    <div className='Game-answer'><h2 className='Game-answer-text'>{shuffledQuestions[currentQuestionIndex].answers[1]}</h2></div>
                    <div className='Game-answer'><h2 className='Game-answer-text'>{shuffledQuestions[currentQuestionIndex].answers[2]}</h2></div>
                    <div className='Game-answer'><h2 className='Game-answer-text'>{shuffledQuestions[currentQuestionIndex].answers[3]}</h2></div>
                </div>
                <div>Timer here</div>
            </div>
            <div className='Game-players right-gradient'>
                {playersArray.slice(2, 4).map(([playerNumber, picture], index) => (
                    <div
                        key={index + 2}
                        className={`Game-player ${selectedPlayerIndex === index + 2 ? 'selected' : ''}`}
                    >
                        <img src={picture || defaultProfile} alt={`Player ${playerNumber}`} className="Game-profile-picture" />
                        <p className='Game-player-score'>14</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Game;
