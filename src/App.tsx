import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PageHeader } from './components/layouts/PageHeader'
import { Home } from './components/pages/Home'

export function App() {
  return (
    <BrowserRouter>
      <PageHeader />
      <Container as="main">
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
