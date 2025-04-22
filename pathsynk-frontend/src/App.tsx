import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import SignUpPage from './pages/SignUpPage'
import PrivateRoute from './components/PrivateRoute'
import Home from '../src/components/Home'
import Application from '../src/components/Application'
import Interviews from './components/Interview'
import Note from './components/Note'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Home/>} />
            <Route path="jobs" element={<Application />} />
            <Route path="interviews" element={<Interviews />} />
            <Route path="notes" element={<Note />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
