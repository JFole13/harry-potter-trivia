import Home from './components/Home';
import Game from './components/Game';
import PlayerSelect from './components/PlayerSelect';
import './css/Home.css';
import './css/Game.css';
import './css/Player.css'
import './css/PlayerSelect.css';
import './css/PlayerModal.css'
import './css/PlayerProfileImage.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player-select" element={<PlayerSelect />} />
          <Route path="/start" element={<Game />} />
        </Routes>
    </Router>
  );
}

export default App;
