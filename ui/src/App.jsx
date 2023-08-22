import './App.css'
import MiniDrawer from './components/MiniDrawer/MiniDrawer'
import Resume from './pages/Resume/Resume';
import ResumeProvider from './context/ResumeContext/ResumeProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import { AuthContextProvider } from './context/AuthContext/AuthContextProvider';
import AuthRoutes from './components/AuthenticatedRoutes';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="851224273053-5p8dg1psgjf5ts80aqgq62crjtm4g3i1.apps.googleusercontent.com">
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route Component={MiniDrawer}> 
                    <Route path="/resume/:resumeCreator" element={<ResumeProvider><Resume /></ResumeProvider>} />
                    <Route element={<AuthRoutes/>}>
                      <Route path="/resume" element={<ResumeProvider><Resume /></ResumeProvider>} />
                      <Route path="/profile" element={<Profile/>} />
                    </Route>
                  </Route>
                </Routes>
                <Footer/>
              </BrowserRouter>
            </QueryClientProvider>
        </AuthContextProvider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
