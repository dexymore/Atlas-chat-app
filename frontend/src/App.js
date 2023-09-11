import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ChatPage from './components/Chat';
// Correct path to HomePage component
// Correct path to ChatPage component



function App() {
  return (
    <div className="App">
    <Routes>
     <Route path="/"  element={<HomePage />} exact/>
    <Route path="/chat"  element={<ChatPage />} exact/>
    </Routes>
     

    </div>
  );
}

export default App;
