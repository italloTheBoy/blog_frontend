import styles from './PageHeader.module.css'
import { Link } from 'react-router-dom'

export function PageHeader() {
  return (
    <nav className={styles.nav}>
      <header className={styles.navHeader}>
        <Link to="/">Blog.ex</Link>
      </header>

      <ul className={styles.navList}>
        <li>
          <Link to="/login">Entrar</Link>
        </li>

        <li>
          <Link to="/register">Cadastrar-se</Link>
        </li>
      </ul>
    </nav>
  )
}