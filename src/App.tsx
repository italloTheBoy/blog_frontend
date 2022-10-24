import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { PageLayout } from './components/layouts/page/PageLayout'
import { AuthProvider } from './contexts/auth'

export function App() {
  return (
    <AuthProvider>
      <PageLayout />
    </AuthProvider>
  )
}
