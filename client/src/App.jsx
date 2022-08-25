import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FourZeroFour from './pages/FourZeroFour'
import Home from './pages/Home'

export const MainContext = createContext()

const App = () => {
  const [tableData, setTableData] = useState([])
  const [searchContext, setSearchContext] = useState('')
  const [bookingInfo, setBookingInfo] = useState({
    id: null,
    name: null,
    from: null,
    to: null,
    rent: null,
    duration: null,
  })
  const [contentUpdated, setContentUpdated] = useState(false)

  return (
    <MainContext.Provider
      value={{
        data: tableData,
        setData: setTableData,
        searchContext,
        setSearchContext,
        bookingInfo,
        setBookingInfo,
        update: contentUpdated,
        setUpdate: setContentUpdated,
      }}
    >
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
