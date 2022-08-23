import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FourZeroFour from './pages/FourZeroFour'
import Home from './pages/Home'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/*' element={<FourZeroFour />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
