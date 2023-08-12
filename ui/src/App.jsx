import './App.css'
import MiniDrawer from './components/MiniDrawer'
import Resume from './pages/Resume/Resume';
import ResumeProvider from './pages/Resume/ResumeProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login/>} />
          <Route Component={MiniDrawer}> 
            <Route path="/resume" element={<ResumeProvider><Resume /></ResumeProvider>} />
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
