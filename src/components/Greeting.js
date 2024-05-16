import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
function Home() {
    return <h1>Home Page</h1>;
  }
  
  function About() {
    return <h1>About Page</h1>;
  }

function Greeting(props) {
    <Router>
          <div>
              <nav>
                  <ul>
                      <li>
                          <Link to="/">Home</Link>
                      </li>
                      <li>
                          <Link to="/about">About</Link>
                      </li>
                  </ul>
              </nav>
              
              <Routes>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
              </Routes>
          </div>
      </Router>
}

export default Greeting;