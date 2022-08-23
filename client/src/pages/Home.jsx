import React from 'react'
import Search from '../components/Search'

const Home = () => {
  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl mt-10'>Renteal Platform</h1>
      <div className='flex justify-end w-screen'>
        <div className='p-10'>
          <Search />
        </div>
      </div>
    </div>
  )
}

export default Home
