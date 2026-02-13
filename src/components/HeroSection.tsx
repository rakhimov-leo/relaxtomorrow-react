import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="메인 히어로">
      <div className={styles.bg}>
        <div className={styles.gradient} />
        <div className={styles.glow} />
      </div>
    </section>
  )
}
