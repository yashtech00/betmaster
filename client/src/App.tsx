import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages'
import Event from './pages/Events'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>} />
        <Route path='/events' element={<Event/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App