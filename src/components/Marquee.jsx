import { Link } from 'react-router-dom'
import styles from './Marquee.module.css'

const ITEMS = [
  { label: '갤럭시 S25', to: '/model/galaxy-s25-5g' },
  { label: '아이폰 17', to: '/model/iphone-17' },
  { label: '갤럭시 Z플립7', to: '/model/galaxy-zflip7' },
  { label: '갤럭시 Z폴드7', to: '/model/galaxy-zfold7' },
  { label: '갤럭시 S25 Ultra', to: '/model/galaxy-s25-ultra-5g' },
  { label: '아이폰 16', to: '/model/iphone-16' },
  { label: '갤럭시 S25+ 5G', to: '/model/galaxy-s25-plus-5g' },
  { label: '갤럭시 S24 FE', to: '/model/galaxy-s24-fe' },
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
