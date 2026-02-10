import styles from './ProductCard.module.css'

export default function ProductCard({ item }) {
  const { name, storage, carrier, badge } = item
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        {badge && <span className={styles.badge}>{badge}</span>}
        <span className={styles.carrier}>{carrier}</span>
      </div>
      <div className={styles.storage}>{storage}</div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.cta}>사전예약 얼리버드 알림신청</p>
      <button type="button" className={styles.btn}>알림 신청</button>
    </article>
  )
}
