import { useEffect } from 'react';
import Window from '../chat/window/Window';
import './App.css'
import { v4 } from 'uuid';
import logoSvg from '../../assets/logo.png';

function App() {

  useEffect(() => {
    sessionStorage.setItem('userId', v4());
  })

  return (
    <div className='App'>
      <header>
        <div className="logo">
          <img src={logoSvg} alt="NoAnswerAi Logo" />
        </div>
        <h1>NoAnswerAi</h1>
      </header>
      <main>
        <Window />
      </main>
    </div>
  )
}

export default App;