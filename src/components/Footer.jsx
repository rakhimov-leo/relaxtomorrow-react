import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.company}>
          <strong>내일은편하게 mobile</strong>
          <p>상호명 <strong>내일은편하게 mobile</strong> | 대표자 | 사업자등록번호 | 통신판매업신고번호</p>
          <p>주소 | 개인정보 책임관리자</p>
          <p className={styles.notice}>
            내일은편하게 mobile은 통신판매중개자이며 통신판매의 당사자가 아닙니다.
          </p>
        </div>
        <div className={styles.links}>
          <a href="/notice">공지사항</a>
          <a href="/privacy">개인정보처리방침</a>
          <a href="/terms">서비스 이용약관</a>
        </div>
        <p className={styles.copyright}>© 내일은편하게 mobile 2025-2026 All rights reserved.</p>
      </div>
    </footer>
  )
}
