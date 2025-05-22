import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App