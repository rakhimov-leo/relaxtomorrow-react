import styles from './CarrierFilter.module.css'

interface CarrierFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

interface CarrierOption {
  id: string;
  name: string;
}

const CARRIERS: CarrierOption[] = [
  { id: 'skt', name: 'SKT' },
  { id: 'kt', name: 'KT' },
  { id: 'lg', name: 'LG' },
  { id: 'mvno', name: '알뜰폰' },
]

export default function CarrierFilter({ value, onChange }: CarrierFilterProps) {
  return (
    <div className={styles.wrap}>
      <h3 className={styles.label}>사용하고 있는 통신사를 알려주세요</h3>
      <p className={styles.hint}>통신사별로 제공되는 혜택이 달라요.</p>
      <div className={styles.list}>
        {CARRIERS.map((c) => (
          <button
            key={c.id}
            type="button"
            className={value === c.id ? styles.itemActive : styles.item}
            onClick={() => onChange(value === c.id ? null : c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  )
}
