
import './App.css'
import { Route, Routes } from 'react-router-dom';

import AuthPage from './components/SignInPage';
import ChatPage from './components/ChatPage';

function App() {
  

  return (
    <div>
      <Routes>
        <Route path={'/'} element={<AuthPage/>} />
        <Route path={'/chat-page'} element={<ChatPage/>}/>
        
      </Routes>
    </div>
  )
}

export default App
