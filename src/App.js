import Home from './components/Home';
import './Home.css';
import PlayerSelect from './components/PlayerSelect';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';



function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player-select" element={<PlayerSelect />} />
        </Routes>
    </Router>
  );
}

export default App;
