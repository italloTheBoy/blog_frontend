import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PageContent } from './components/layouts/PageContent'
import { PageHeader } from './components/layouts/PageHeader'
import { Home } from './components/pages/Home'

export function App() {
  return (
    <BrowserRouter>
      <PageHeader />
      <PageContent>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </PageContent>
    </BrowserRouter>
  )
}
