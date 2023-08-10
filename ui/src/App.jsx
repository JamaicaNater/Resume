import './App.css'
import MiniDrawer from './components/MiniDrawer'
import Resume from './pages/Resume';
import ResumeProvider from './pages/ResumeProvider';

function App() {

  return (
    <>
      <MiniDrawer>
        <ResumeProvider>
          <Resume/>
        </ResumeProvider>
      </MiniDrawer>
    </>
  )
}

export default App
