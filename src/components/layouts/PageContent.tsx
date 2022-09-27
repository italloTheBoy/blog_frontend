import styles from './PageContent.module.css';
import { ReactNode } from 'react'

interface IPageContentProps {
  children: ReactNode
}

export function PageContent({ children }: IPageContentProps) {
  return (
    <main className={styles.pageContent}>
      {children}
    </main>
  )
}