import Navbar from './components/navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Read from './components/Read'
import Create from './components/Create'
import Update from './components/Update'
import './App.css'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar />
        <Routes>
           <Route path = '/' element = {<Create/>}/>   
           <Route path = '/all' element = {<Read/>}/>   
           <Route path = '/update/:id' element = {<Update/>}/>   
        </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App
