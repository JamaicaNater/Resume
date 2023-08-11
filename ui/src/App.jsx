import './App.css'
import MiniDrawer from './components/MiniDrawer'
import Resume from './pages/Resume';
import ResumeProvider from './pages/ResumeProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
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
