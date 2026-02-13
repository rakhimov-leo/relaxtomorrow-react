import ProductCard from './ProductCard'
import { DEALS } from '../data/deals'
import styles from './ProductGrid.module.css'

interface ProductGridProps {
  brand: string | null;
  storage: string | null;
  carrier: string | null;
  revealed: boolean;
}

const CARRIER_NAMES: Record<string, string> = { skt: 'SKT', kt: 'KT', lg: 'LG', mvno: '알뜰폰' }

// 기종 필터에서 선택한 모델 이름 → 삼성/애플
// 기종 선택 시 삼성/애플로 필터 (BrandFilter와 동일한 이름)
const BRAND_BY_MODEL: Record<string, string> = {
  '갤럭시 S25 5G': 'samsung', '갤럭시 S25+ 5G': 'samsung', '갤럭시 S25 Ultra 5G': 'samsung', '갤럭시 S25엣지': 'samsung',
  '아이폰17': 'apple', '아이폰 17 Air': 'apple', '아이폰 17 PRO': 'apple', '아이폰 16': 'apple',
}

export default function ProductGrid({ brand, storage, carrier, revealed }: ProductGridProps) {
  const carrierName = carrier ? CARRIER_NAMES[carrier] : null
  const brandKey = brand ? BRAND_BY_MODEL[brand] : null

  const filtered = DEALS.filter((p) => {
    if (storage && p.storage !== storage) return false
    if (carrierName && p.carrier !== carrierName) return false
    if (brandKey && p.brand !== brandKey) return false
    return true
  })

  return (
    <div className={styles.wrap}>
      <p className={styles.count}>총 {filtered.length}개</p>
      <div className={`${styles.grid} ${revealed ? styles.reveal : ''}`}>
        {filtered.map((item, i) => (
          <ProductCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}
