import { Link } from 'react-router-dom'
import styles from './Marquee.module.css'

const ITEMS = [
  { label: '갤럭시 S25', to: '/model/galaxy-s25-5g' },
  { label: '아이폰 17', to: '/model/iphone-17' },
  { label: '셀프가입', to: '/' },
  { label: '사전예약', to: '/' },
  { label: '특가', to: '/' },
  { label: 'Samsung', to: '/' },
  { label: 'Apple', to: '/' },
  { label: 'SKT', to: '/?carrier=skt' },
  { label: 'KT', to: '/?carrier=kt' },
  { label: 'LG U+', to: '/?carrier=lg' },
]

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.track}>
        {row.map((item, i) => (
          <Link
            key={`${item.label}-${i}`}
            to={item.to}
            className={styles.item}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
