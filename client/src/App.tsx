import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages'
import Event from './pages/Events'
import { EventDetail } from './components/EventDetail'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>} />
        <Route path='/events' element={<Event />} />
        <Route path='/events/:id' element={<EventDetail/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App