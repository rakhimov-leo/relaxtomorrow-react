import ProductCard from './ProductCard'
import styles from './ProductGrid.module.css'

const MOCK_PRODUCTS = [
  { id: '1', name: 'Galaxy S26 Series', storage: '256GB', carrier: 'SKT', badge: '사전예약' },
  { id: '2', name: 'Galaxy S26 Series', storage: '256GB', carrier: 'KT' },
  { id: '3', name: 'Galaxy S26 Series', storage: '512GB', carrier: 'SKT', badge: '얼리버드' },
  { id: '4', name: '아이폰 17', storage: '256GB', carrier: 'SKT' },
  { id: '5', name: '아이폰 17 PRO', storage: '256GB', carrier: 'KT', badge: '사전예약' },
  { id: '6', name: '갤럭시 S25 Ultra 5G', storage: '256GB', carrier: 'LG' },
]

const CARRIER_NAMES = { skt: 'SKT', kt: 'KT', lg: 'LG', mvno: '알뜰폰' }

export default function ProductGrid({ brand, storage, carrier }) {
  const carrierName = carrier ? CARRIER_NAMES[carrier] : null
  const filtered = MOCK_PRODUCTS.filter((p) => {
    if (storage && p.storage !== storage) return false
    if (carrierName && p.carrier !== carrierName) return false
    return true
  })

  return (
    <div className={styles.wrap}>
      <p className={styles.count}>총 {filtered.length}개</p>
      <div className={styles.grid}>
        {filtered.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
