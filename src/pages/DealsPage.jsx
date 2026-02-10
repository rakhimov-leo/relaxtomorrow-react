import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BrandFilter from '../components/BrandFilter'
import StorageFilter from '../components/StorageFilter'
import CarrierFilter from '../components/CarrierFilter'
import ModelImagePanel from '../components/ModelImagePanel'
import ProductGrid from '../components/ProductGrid'
import styles from './DealsPage.module.css'

export default function DealsPage() {
  const [brand, setBrand] = useState(null)
  const [storage, setStorage] = useState(null)
  const [carrier, setCarrier] = useState(null)

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.inner}>
          <section className={styles.hero}>
            <h1 className={styles.title}>셀프가입</h1>
            <p className={styles.subtitle}>
              상담 없는 구조로 완성된 셀프가입 고객만을 위한 특가 혜택!
            </p>
          </section>

          <div className={styles.contentRow}>
            <section className={styles.filters}>
              <BrandFilter value={brand} onChange={setBrand} />
              <StorageFilter value={storage} onChange={setStorage} />
              <CarrierFilter value={carrier} onChange={setCarrier} />
            </section>
            <ModelImagePanel selectedModel={brand} />
          </div>

          <ProductGrid brand={brand} storage={storage} carrier={carrier} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
