import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FourZeroFour from './pages/FourZeroFour'
import Home from './pages/Home'

export const MainContext = createContext()

const App = () => {
  const [tableData, setTableData] = useState([])
  return (
    <MainContext.Provider value={{ data: tableData, setData: setTableData }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/*' element={<FourZeroFour />} />
        </Routes>
      </BrowserRouter>
    </MainContext.Provider>
  )
}

export default App
