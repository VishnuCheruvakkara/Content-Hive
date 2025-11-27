import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Tailwind v4 with Vite + React ✔
        </h1>
      </div>
    </>
  )
}

export default App
