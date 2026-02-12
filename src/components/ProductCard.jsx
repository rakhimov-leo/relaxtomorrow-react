import { Link } from 'react-router-dom'
import { formatPrice } from '../data/deals'
import styles from './ProductCard.module.css'

export default function ProductCard({ item, index = 0 }) {
  const { name, storage, carrier, carrierType, badge, priceOriginal, priceSale, slug } = item
  const detailSlug = slug || name.toLowerCase().replace(/\s+/g, '-')
  const priceText = priceSale !== undefined && priceSale !== null ? formatPrice(priceSale) : null
  const originalText = priceOriginal ? formatPrice(priceOriginal) : null

  return (
    <article className={styles.card} style={{ '--i': index }}>
      <div className={styles.top}>
        {badge && <span className={styles.badge}>{badge}</span>}
        <span className={styles.carrier}>
          {carrier} {carrierType && <span className={styles.carrierType}>{carrierType}</span>}
        </span>
      </div>
      <div className={styles.storage}>{storage}</div>
      <h3 className={styles.name}>
        <Link to={`/model/${detailSlug}`} className={styles.nameLink}>{name}</Link>
      </h3>
      {(priceText != null || originalText) && (
        <div className={styles.priceRow}>
          {priceText != null && <span className={styles.priceSale}>{priceText}</span>}
          {originalText && (
            <span className={styles.priceOriginal}>출고가 <s>{originalText}</s></span>
          )}
        </div>
      )}
      <p className={styles.cta}>사전예약 얼리버드 알림신청</p>
      <button type="button" className={styles.btn}>알림 신청</button>
    </article>
  )
}
