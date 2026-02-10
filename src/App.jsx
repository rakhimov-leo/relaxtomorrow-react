import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DealsPage from './pages/DealsPage'
import ModelDetailPage from './pages/ModelDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DealsPage />} />
        <Route path="/model/:slug" element={<ModelDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
