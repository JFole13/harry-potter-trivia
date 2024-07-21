import React, { useState, useEffect, useRef } from 'react';
import defaultProfile from "../images/default-profile.png";
import { useLocation } from 'react-router-dom';

const questions = [
    { question: "What is the capital of France?", answers: ["Milan", "Paris", "New York", "Your mom"], correctAnswer: "Paris" },
    { question: "What is 2 + 2?", answers: ["4", "5", "6", "7"], correctAnswer: "4" },
    { question: "What is the largest planet?", answers: ["Mars", "Earth", "Jupiter", "Pluto"], correctAnswer: "Jupiter" },
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
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [showRoundTitle, setShowRoundTitle] = useState(true);
    const [timeLeft, setTimeLeft] = useState(10);
    const [playerScores, setPlayerScores] = useState({});
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerIsCorrect, setAnswerIsCorrect] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [isTimePaused, setTimePaused] = useState(false);
    const [answerSelected, setAnswerSelected] = useState(false);
    const timerRef = useRef();

    const playersArray = playerPictures ? Object.entries(playerPictures) : [];

    useEffect(() => {
        // Shuffle the questions array once when the component mounts
        const shuffled = shuffleArray([...questions]).map(question => ({
            ...question,
            answers: shuffleArray([...question.answers])
        }));
        setShuffledQuestions(shuffled);

        // Initialize player scores
        const initialScores = playersArray.reduce((scores, [playerNumber]) => {
            scores[playerNumber] = 0;
            return scores;
        }, {});
        setPlayerScores(initialScores);
    }, []);

    useEffect(() => {
        // Randomly select a starting player
        const initialPlayerIndex = Math.floor(Math.random() * playersArray.length);
        setSelectedPlayerIndex(initialPlayerIndex);
    }, [playersArray.length]);

    useEffect(() => {
        const roundTitleTimer = setTimeout(() => {
            setShowRoundTitle(false);
        }, 3000); // Show round title for 3 seconds

        return () => clearTimeout(roundTitleTimer);
    }, []);

    useEffect(() => {
        let timer;
        if (!showRoundTitle) {
            // Start question timer after round title is hidden
            timer = setTimeout(() => {
                setCurrentQuestionIndex((prevIndex) =>
                    prevIndex + 1 < shuffledQuestions.length ? prevIndex + 1 : 0
                );
                // Rotate to the next player
                setSelectedPlayerIndex((prevIndex) =>
                    (prevIndex + 1) % playersArray.length
                );
                setTimeLeft(10); // Reset the timer for each new question
                setTimePaused(false);
                setAnswerSelected(false);
            }, 10000); // Change question every 10 seconds
        }

        return () => clearTimeout(timer);
    }, [currentQuestionIndex, shuffledQuestions.length, playersArray.length, showRoundTitle]);

    useEffect(() => {
        if (!showRoundTitle && !isTimePaused) {
            // Timer logic will run only if time is not paused
            const timerElement = timerRef.current;
            const timerCircle = timerElement.querySelector('svg > circle + circle');
            timerElement.classList.add('animatable');
            timerCircle.style.strokeDashoffset = 0;
    
            const countdownTimer = setInterval(() => {
                setTimeLeft((prevTimeLeft) => {
                    if (prevTimeLeft > 0) {
                        const normalizedTime = (10 - prevTimeLeft + 1) / 10;
                        timerCircle.style.strokeDashoffset = normalizedTime;
                        return prevTimeLeft - 1;
                    } else {
                        clearInterval(countdownTimer);
                        timerElement.classList.remove('animatable');
                        return 0;
                    }
                });
            }, 1000);
    
            return () => clearInterval(countdownTimer);
        }
    }, [showRoundTitle, isTimePaused]);

    const handleAnswerClick = (answer) => {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        const isCorrect = answer === currentQuestion.correctAnswer;
        setSelectedAnswer(answer);
        setAnswerIsCorrect(isCorrect);
        setTimePaused(true);
        setAnswerSelected(true);

    
        // Update player scores if the answer is correct
        if (isCorrect) {
            const currentPlayer = playersArray[selectedPlayerIndex][0];
            setPlayerScores((prevScores) => ({
                ...prevScores,
                [currentPlayer]: prevScores[currentPlayer] + 1
            }));
        } else {
            // Set the correct answer when the user picks the wrong one
            setCorrectAnswer(currentQuestion.correctAnswer);
        }
    
        // Move to the next question and player after a delay
        setTimeout(() => {
            setCurrentQuestionIndex((prevIndex) =>
                prevIndex + 1 < shuffledQuestions.length ? prevIndex + 1 : 0
            );
            setSelectedPlayerIndex((prevIndex) =>
                (prevIndex + 1) % playersArray.length
            );
            setSelectedAnswer(null);
            setAnswerIsCorrect(null);
            setCorrectAnswer(null);
            setTimeLeft(10); // Reset the timer for the next question
            setTimePaused(false);
        }, 2000); // Delay for 2 seconds before moving to the next question
    };

    return (
        <div className="Game">
            <div className='Game-players left-gradient'>
                {playersArray.slice(0, 2).map(([playerNumber, picture], index) => (
                    <div
                        key={index}
                        className={`Game-player ${selectedPlayerIndex === index ? 'selected' : ''}`}
                    >
                        <img src={picture || defaultProfile} alt={`Player ${playerNumber}`} className="Game-profile-picture" />
                        <p className='Game-player-score'>{playerScores[playerNumber]}</p>
                    </div>
                ))}
            </div>
            <div className="Game-board">
                {showRoundTitle ? (
                    <h2 className='Game-round-title'>Round 1</h2>
                ) : (
                    <>
                        {shuffledQuestions.length > 0 && (
                            <>
                                <h1 className='Game-question'>{shuffledQuestions[currentQuestionIndex].question}</h1>
                                <div className='Game-answers'>
    {shuffledQuestions[currentQuestionIndex].answers.map((answer, index) => {
        const isCorrectAnswer = answer === shuffledQuestions[currentQuestionIndex].correctAnswer;
        const isSelectedAnswer = selectedAnswer === answer && answerIsCorrect !== null;
        const isWrongAnswer = isSelectedAnswer && !answerIsCorrect;
        const isAnyAnswerSelected = answerSelected || isWrongAnswer;
        const isCorrectOption = isCorrectAnswer && (isAnyAnswerSelected || isSelectedAnswer);
        return (
            <div
                key={index}
                className={`Game-answer ${isSelectedAnswer ? (isCorrectAnswer ? 'correct' : 'wrong') : ''} ${isCorrectOption ? 'correct-answer' : ''}`}
                onClick={() => handleAnswerClick(answer)}
                style={{ opacity: isAnyAnswerSelected ? (isSelectedAnswer || isCorrectOption || isWrongAnswer ? 1 : 0.5) : 1 }}
            >
                <h2 className='Game-answer-text'>{answer}</h2>
            </div>
        );
    })}
</div>
                            </>
                        )}
                        <div ref={timerRef} className="timer animatable">
                            <svg>
                                <circle cx="50%" cy="50%" r="45" />
                                <circle cx="50%" cy="50%" r="45" pathLength="1" />
                                <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="timer-text">{timeLeft}</text>
                            </svg>
                        </div>
                    </>
                )}
            </div>
            <div className='Game-players right-gradient'>
                {playersArray.slice(2, 4).map(([playerNumber, picture], index) => (
                    <div
                        key={index + 2}
                        className={`Game-player ${selectedPlayerIndex === index + 2 ? 'selected' : ''}`}
                    >
                        <img src={picture || defaultProfile} alt={`Player ${playerNumber}`} className="Game-profile-picture" />
                        <p className='Game-player-score'>{playerScores[playerNumber]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Game;

