import React from 'react'
import BookButton from '../components/BookButton'
import ReturnButton from '../components/ReturnButton'
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
      <div className='table__container'>
        <TableView />
      </div>
      <div className='action_container'>
        <div className='flex w-screen justify-end'>
          <div className='p-2 md:p-10 flex md:justify-end justify-center w-screen'>
            <div className='p-1'>
              <BookButton />
            </div>
            <div className='p-1'>
              <ReturnButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
