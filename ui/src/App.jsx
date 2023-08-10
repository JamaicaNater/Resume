import './App.css'
import MiniDrawer from './components/MiniDrawer'
import Resume from './pages/Resume';
import ResumeProvider from './pages/ResumeProvider';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <MiniDrawer>
        <ResumeProvider>
          <Resume/>
        </ResumeProvider>
        <Footer/>
      </MiniDrawer>
    </>
  )
}

export default App
