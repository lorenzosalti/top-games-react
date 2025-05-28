import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/games' element={<div>Games</div>} />
          <Route path='/games/:id' element={<div>Detail Game</div>} />
          <Route path='/console/playstation' element={<div>Console:play</div>} />
          <Route path='/console/xbox' element={<div>Console:xbox</div>} />
          <Route path='/console/pc' element={<div>Console:pc</div>} />
          <Route path='/console/switch' element={<div>Console:switch</div>} />
          <Route path='/order' element={<div>Orders</div>} />
          <Route path='/order/:id' element={<div>Detail Order</div>} />
          <Route path='/mailing-list' element={<div>Mailing-list</div>} />
          <Route path='*' element={<div>Error Page dont exist</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
