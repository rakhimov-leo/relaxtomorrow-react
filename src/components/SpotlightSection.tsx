import { Link } from 'react-router-dom'
import { formatPrice, type Deal } from '../data/deals'
import styles from './SpotlightSection.module.css'

interface SpotlightSectionProps {
  title: string;
  items: Deal[];
}

export default function SpotlightSection({ title, items }: SpotlightSectionProps) {
  if (!items?.length) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.list}>
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/model/${item.slug}`}
            className={styles.card}
          >
            <span className={styles.name}>{item.name}</span>
            <span className={styles.meta}>
              {item.carrier} {item.storage}
            </span>
            <span className={styles.price}>
              {item.priceSale !== undefined && item.priceSale !== null
                ? formatPrice(item.priceSale)
                : formatPrice(item.priceOriginal)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
