import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img src="/logo.png" alt="내일은편하게 모바일" className={styles.logoImg} />
        </Link>
        <a href="/contact" className={styles.contactBtn}>문의하기</a>
      </div>
    </header>
  )
}
