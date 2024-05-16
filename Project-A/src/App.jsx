
import './App.css'
import { Route, Routes } from 'react-router-dom';
import SignInPage from './components/SignInPage';

function App() {
  

  return (
    <div>
      <Routes>
        <Route path={'/'} element={<SignInPage/>} />

        
      </Routes>
    </div>
  )
}

export default App
