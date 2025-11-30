import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import RouterConfig from './routes/RouterConfig';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterConfig />
      </BrowserRouter>
    </>
  )
}

export default App
