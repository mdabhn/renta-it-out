import React from 'react'
import Search from '../components/Search'
import TableView from '../components/TableView'

const Home = () => {
  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl mt-10'>Renteal Platform</h1>
      <div className='flex justify-end w-screen'>
        <div className='p-2 md:p-10 flex md:justify-end justify-center w-screen'>
          <Search />
        </div>
      </div>
      <TableView />
    </div>
  )
}

export default Home
