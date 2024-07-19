import './App.css'
import { useState } from 'react'
import Display from './pages/Display'
import Home from './pages/Home'
import type { Location } from './types'

function App() {
  const [location, setLocation] = useState<Location | null>(null)

  return (
    <>
      <h1>plan ahead</h1>
      {!location && <Home setLocation={setLocation} />}
      {location && <Display location={location} setLocation={setLocation} />}
    </>
  )
}

export default App
