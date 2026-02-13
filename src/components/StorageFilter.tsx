import styles from './StorageFilter.module.css'

interface StorageFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const OPTIONS: string[] = ['16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB']

export default function StorageFilter({ value, onChange }: StorageFilterProps) {
  return (
    <div className={styles.wrap}>
      <h3 className={styles.label}>용량</h3>
      <div className={styles.list}>
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            className={value === opt ? styles.itemActive : styles.item}
            onClick={() => onChange(value === opt ? null : opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
