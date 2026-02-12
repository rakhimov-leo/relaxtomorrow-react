// km-phone.com 스타일 데모 데이터 (국민폰 참고)
export const DEALS = [
  { id: '1', name: '갤럭시 S25 5G', slug: 'galaxy-s25-5g', storage: '256GB', carrier: 'SKT', carrierType: '이동', badge: '⭐0원-종료임박', priceOriginal: 1155000, priceSale: 0, brand: 'samsung' },
  { id: '2', name: '아이폰 17', slug: 'iphone-17', storage: '256GB', carrier: 'KT', carrierType: '이동', badge: '⭐미친할인', priceOriginal: 1287000, priceSale: 117000, brand: 'apple' },
  { id: '3', name: '갤럭시 Z플립7', slug: 'galaxy-s25-5g', storage: '256GB', carrier: 'SKT', carrierType: '이동', badge: '⭐국민지원금', priceOriginal: 1485000, priceSale: 65000, brand: 'samsung' },
  { id: '4', name: '아이폰 16', slug: 'iphone-16', storage: '256GB', carrier: 'LG', carrierType: '이동', badge: '⭐오늘끝딜', priceOriginal: 1243000, priceSale: 0, brand: 'apple' },
  { id: '5', name: '아이폰 17 PRO', slug: 'iphone-17-pro', storage: '256GB', carrier: 'SKT', carrierType: '이동', badge: '⭐미친할인', priceOriginal: 1782000, priceSale: 512000, brand: 'apple' },
  { id: '6', name: '아이폰 17 프로맥스', slug: 'iphone-17-pro', storage: '512GB', carrier: 'SKT', carrierType: '이동', badge: '⭐미친할인', priceOriginal: 1980000, priceSale: 940000, brand: 'apple' },
  { id: '7', name: '갤럭시 Z폴드7', slug: 'galaxy-s25-ultra-5g', storage: '256GB', carrier: 'SKT', carrierType: '이동', badge: '⭐국민지원금', priceOriginal: 2379300, priceSale: 1059300, brand: 'samsung' },
  { id: '8', name: '갤럭시 S25 Ultra 5G', slug: 'galaxy-s25-ultra-5g', storage: '256GB', carrier: 'SKT', carrierType: '이동', badge: '⭐152만 할인 + 워치8', priceOriginal: 1698400, priceSale: 378400, brand: 'samsung' },
  { id: '9', name: '갤럭시 S25+ 5G', slug: 'galaxy-s25-plus-5g', storage: '256GB', carrier: 'SKT', carrierType: '이동', badge: '⭐142만 할인 + 워치8', priceOriginal: 1353000, priceSale: 33000, brand: 'samsung' },
  { id: '10', name: '갤럭시 S25엣지', slug: 'galaxy-s25-edge', storage: '256GB', carrier: 'LG', carrierType: '이동', badge: '⭐137만 할인 + 워치8', priceOriginal: 1496000, priceSale: 472000, brand: 'samsung' },
  { id: '11', name: '갤럭시 S24 FE', slug: 'galaxy-s25-5g', storage: '128GB', carrier: 'KT', carrierType: '기기변경', badge: null, priceOriginal: 946000, priceSale: 0, brand: 'samsung' },
  { id: '12', name: '갤럭시 Z플립6', slug: 'galaxy-s25-5g', storage: '256GB', carrier: 'SKT', carrierType: '기기변경', badge: '⭐0원', priceOriginal: 1485000, priceSale: 165000, brand: 'samsung' },
  { id: '13', name: '아이폰 17 Air', slug: 'iphone-17-air', storage: '256GB', carrier: 'LG', carrierType: '이동', badge: '⭐미친할인', priceOriginal: 1584000, priceSale: 214000, brand: 'apple' },
  { id: '14', name: '아이폰 16 플러스', slug: 'iphone-16', storage: '256GB', carrier: 'LG', carrierType: '이동', badge: '⭐142만 할인', priceOriginal: 1342000, priceSale: 0, brand: 'apple' },
  { id: '15', name: '아이폰 16 프로', slug: 'iphone-16', storage: '256GB', carrier: 'LG', carrierType: '이동', badge: '⭐152만 할인', priceOriginal: 1540000, priceSale: 270000, brand: 'apple' },
  { id: '16', name: '아이폰 15', slug: 'iphone-16', storage: '128GB', carrier: 'KT', carrierType: '기기변경', badge: '영끌할인', priceOriginal: 1243000, priceSale: 23000, brand: 'apple' },
  { id: '17', name: '갤럭시 S25 5G', slug: 'galaxy-s25-5g', storage: '256GB', carrier: 'KT', carrierType: '이동', badge: '사전예약', priceOriginal: 1155000, priceSale: 0, brand: 'samsung' },
  { id: '18', name: '아이폰 17', slug: 'iphone-17', storage: '256GB', carrier: 'SKT', carrierType: '이동', badge: null, priceOriginal: 1287000, priceSale: 217000, brand: 'apple' },
  { id: '19', name: '갤럭시 S25 Ultra 5G', slug: 'galaxy-s25-ultra-5g', storage: '512GB', carrier: 'LG', carrierType: '이동', badge: null, priceOriginal: 1898400, priceSale: 578400, brand: 'samsung' },
  { id: '20', name: '아이폰 16', slug: 'iphone-16', storage: '128GB', carrier: 'KT', carrierType: '기기변경', badge: '오늘끝딜', priceOriginal: 1243000, priceSale: 33000, brand: 'apple' },
]

function formatPrice(won) {
  if (won === 0) return '0원'
  return `${won.toLocaleString('ko-KR')}원`
}

export { formatPrice }

// 가장 많이 본 기기 (order: deal ids)
export const MOST_VIEWED_IDS = ['1', '2', '4', '8', '5', '3']
// 많이 팔린 폰 (best selling)
export const BEST_SELLING_IDS = ['1', '4', '2', '9', '6', '10']

export function getMostViewed() {
  return MOST_VIEWED_IDS.map((id) => DEALS.find((d) => d.id === id)).filter(Boolean)
}

export function getBestSelling() {
  return BEST_SELLING_IDS.map((id) => DEALS.find((d) => d.id === id)).filter(Boolean)
}
