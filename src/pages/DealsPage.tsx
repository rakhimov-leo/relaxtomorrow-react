import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import Marquee from '../components/Marquee'
import SpotlightSection from '../components/SpotlightSection'
import BrandFilter from '../components/BrandFilter'
import StorageFilter from '../components/StorageFilter'
import CarrierFilter from '../components/CarrierFilter'
import ModelImagePanel from '../components/ModelImagePanel'
import ProductGrid from '../components/ProductGrid'
import { useInView } from '../hooks/useInView'
import { getModelByName } from '../data/models'
import { getMostViewed, getBestSelling } from '../data/deals'
import styles from './DealsPage.module.css'

const VALID_CARRIERS = ['skt', 'kt', 'lg', 'mvno']

export default function DealsPage() {
  const [searchParams] = useSearchParams()
  const [brand, setBrand] = useState<string | null>(null)
  const [storage, setStorage] = useState<string | null>(null)
  const [carrier, setCarrier] = useState<string | null>(null)
  const [contentRef, contentInView] = useInView()
  const [gridRef, gridInView] = useInView()

  useEffect(() => {
    const c = searchParams.get('carrier')
    if (c && VALID_CARRIERS.includes(c.toLowerCase())) setCarrier(c.toLowerCase())
  }, [searchParams])

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <HeroSection />
        <Marquee />
        <div className={styles.inner}>
          <div
            ref={contentRef}
            className={`${styles.contentRow} ${contentInView ? styles.reveal : ''}`}
          >
            <section className={styles.filters}>
              <h2 className={styles.sectionTitle}>기종 · 용량 · 통신사</h2>
              <BrandFilter value={brand} onChange={setBrand} />
              <StorageFilter value={storage} onChange={setStorage} />
              <CarrierFilter value={carrier} onChange={setCarrier} />
              {(() => {
                const allSelected = !!(brand && storage && carrier && getModelByName(brand))
                const slug = brand && getModelByName(brand) ? getModelByName(brand)!.slug : ''
                return allSelected ? (
                  <Link to={`/model/${slug}`} className={styles.selectBtn}>
                    선택하기
                  </Link>
                ) : (
                  <span className={styles.selectBtnDisabled}>
                    선택하기
                  </span>
                )
              })()}
            </section>
            <ModelImagePanel selectedModel={brand} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
