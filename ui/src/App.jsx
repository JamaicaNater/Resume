import './App.css'
import { useState } from 'react';
import MiniDrawer from './components/MiniDrawer'
import Placeholder from './pages/Placeholder'
import Resume from './pages/Resume';

function App() {
  const [page, setPage] = useState(<Resume/>)

  return (
    <>
      <MiniDrawer changePageContent={setPage}>
        {page}
      </MiniDrawer>
    </>
  )
}

export default App
