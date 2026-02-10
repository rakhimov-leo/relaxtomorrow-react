import { useState } from 'react'
import styles from './BrandFilter.module.css'

const BRANDS = {
  samsung: [
    '갤럭시 S25 5G',
    '갤럭시 S25+ 5G',
    '갤럭시 S25 Ultra 5G',
    '갤럭시 S25엣지',
  ],
  apple: [
    '아이폰17',
    '아이폰 17 Air',
    '아이폰 17 PRO',
    '아이폰 16',
  ],
}

export default function BrandFilter({ value, onChange }) {
  const [activeTab, setActiveTab] = useState('samsung')
  const [showMore, setShowMore] = useState(false)

  const list = BRANDS[activeTab] || []
  const displayList = showMore ? list : list.slice(0, 3)

  const switchToSamsung = () => {
    setActiveTab('samsung')
    setShowMore(false)
    if (value && !BRANDS.samsung.includes(value)) onChange(null)
  }
  const switchToApple = () => {
    setActiveTab('apple')
    setShowMore(false)
    if (value && !BRANDS.apple.includes(value)) onChange(null)
  }

  return (
    <div className={styles.wrap}>
      <h3 className={styles.label}>기종</h3>
      <div className={styles.tabs}>
        <button
          type="button"
          className={activeTab === 'samsung' ? styles.tabActive : styles.tab}
          onClick={switchToSamsung}
        >
          삼성
        </button>
        <button
          type="button"
          className={activeTab === 'apple' ? styles.tabActive : styles.tab}
          onClick={switchToApple}
        >
          애플
        </button>
      </div>
      <div className={styles.list}>
        {displayList.map((name) => (
          <button
            key={name}
            type="button"
            className={value === name ? styles.itemActive : styles.item}
            onClick={() => onChange(value === name ? null : name)}
          >
            {name}
          </button>
        ))}
        {list.length > 3 && (
          <button
            type="button"
            className={styles.more}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? '접기' : '더보기'}
          </button>
        )}
      </div>
    </div>
  )
}
