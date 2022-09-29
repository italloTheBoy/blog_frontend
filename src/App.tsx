import 'bootstrap/dist/css/bootstrap.min.css'
import { PageLayout } from './components/layouts/page/PageLayout'
import { AuthProvider } from './contexts/auth'

export function App() {
  return (
    <AuthProvider>
      <PageLayout />
    </AuthProvider>
  )
}
