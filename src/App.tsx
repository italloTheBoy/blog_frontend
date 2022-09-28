import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PageHeader } from './components/layouts/PageHeader'
import { Home } from './components/pages/Home'
import { NotFound } from './components/pages/statusCode/NotFound'

export function App() {
  return (
    <BrowserRouter>
      <PageHeader />
      <Container as="main">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
