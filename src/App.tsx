import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LocalGame } from './game/LocalGame';
import { Home } from './Home';
import { TutorialHome } from './tutorial/TutorialHome';
import { TutorialPlayer } from './tutorial/TutorialPlayer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>쇼기 배우기</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tutorial" element={<TutorialHome />} />
          <Route path="/tutorial/:lessonId" element={<TutorialPlayer />} />
          <Route path="/play" element={<LocalGame />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
