import { Link } from 'react-router-dom'
import { getModelByName } from '../data/models'
import styles from './ModelImagePanel.module.css'

const PLACEHOLDER = 'https://placehold.co/280x420/e5e7eb/9ca3af?text=Phone'

export default function ModelImagePanel({ selectedModel }) {
  const model = selectedModel ? getModelByName(selectedModel) : null
  const src = model ? model.image : PLACEHOLDER
  const slug = model ? model.slug : null
  const showPlaceholderNote = selectedModel && !model

  const content = (
    <>
      <div className={styles.frame}>
        <img
          src={src}
          alt={selectedModel || '모델 선택'}
          className={styles.img}
          onError={(e) => {
            e.target.src = PLACEHOLDER
            e.target.alt = selectedModel || '모델 선택'
          }}
        />
      </div>
      <p className={styles.name}>
        {selectedModel || '기종을 선택하세요'}
      </p>
      {showPlaceholderNote && (
        <p className={styles.note}>이미지: public/images/models/ 에 추가</p>
      )}
    </>
  )

  return (
    <div className={styles.panel}>
      {slug ? (
        <Link to={`/model/${slug}`} className={styles.link}>
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  )
}
