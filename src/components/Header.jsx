import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>Neirin Pyonagi</a>
        <nav className={styles.nav}>
          <a href="/deals">특가 모음</a>
          <a href="/self">셀프가입</a>
          <a href="/reserve">사전예약</a>
          <a href="/inquiry">가입신청내역</a>
        </nav>
        <div className={styles.auth}>
          <a href="/login">로그인/회원가입</a>
        </div>
      </div>
    </header>
  )
}
