import React, { useContext } from 'react'
import { MainContext } from '../App'

const Search = () => {
  const { searchContext, setSearchContext } = useContext(MainContext)

  return (
    <div>
      <input
        type='text'
        className='border border-gray-400 rounded p-2 text-sm'
        placeholder='Search'
        value={searchContext}
        onChange={(e) => setSearchContext(e.target.value)}
      />
    </div>
  )
}

export default Search
