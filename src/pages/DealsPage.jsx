import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
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
import { getMostViewed, getBestSelling } from '../data/deals'
import styles from './DealsPage.module.css'

const VALID_CARRIERS = ['skt', 'kt', 'lg', 'mvno']

export default function DealsPage() {
  const [searchParams] = useSearchParams()
  const [brand, setBrand] = useState(null)
  const [storage, setStorage] = useState(null)
  const [carrier, setCarrier] = useState(null)
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
          <SpotlightSection title="가장 많이 본 기기" items={getMostViewed()} />
          <SpotlightSection title="많이 팔린 폰" items={getBestSelling()} />
          <div
            ref={contentRef}
            className={`${styles.contentRow} ${contentInView ? styles.reveal : ''}`}
          >
            <section className={styles.filters}>
              <h2 className={styles.sectionTitle}>기종 · 용량 · 통신사</h2>
              <BrandFilter value={brand} onChange={setBrand} />
              <StorageFilter value={storage} onChange={setStorage} />
              <CarrierFilter value={carrier} onChange={setCarrier} />
            </section>
            <ModelImagePanel selectedModel={brand} />
          </div>

          <div ref={gridRef} className={`${styles.gridWrap} ${gridInView ? styles.reveal : ''}`}>
            <ProductGrid brand={brand} storage={storage} carrier={carrier} revealed={gridInView} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
