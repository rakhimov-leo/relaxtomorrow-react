import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getModelBySlug } from '../data/models'
import { IconSelfSignup, IconHourglass, IconStore } from '../components/InfoCardIcons'
import styles from './ModelDetailPage.module.css'

const PLACEHOLDER = 'https://placehold.co/400x600/e5e7eb/9ca3af?text=Phone'

const CARRIER_OPTIONS = [
  { id: 'skt', label: 'SKT / 번호이동', desc: '쓰던 번호 그대로, 통신사만 변경할게요', logo: 'T' },
  { id: 'kt', label: 'KT / 기기변경', desc: '이용중인 KT통신사에서 휴대폰만 바꾸고 싶어요', logo: 'kt' },
  { id: 'lgu', label: 'LG U+ / 번호이동', desc: '쓰던 번호 그대로, 통신사만 변경할게요', logo: 'U+' },
]

const COLOR_OPTIONS = [
  { id: 'c1', name: '블랙', soldOut: true },
  { id: 'c2', name: '화이트', soldOut: true },
  { id: 'c3', name: '라벤더', soldOut: true },
  { id: 'c4', name: '그레이', soldOut: true },
  { id: 'c5', name: '기본', soldOut: false },
]
const PLANS = [
  { id: 'super', name: '5G 프리미어 슈퍼', price: '115,000', benefit: '1,040,000원', data: '데이터 무제한', voice: '통화 무제한, 문자 무제한', sub: '부가통화 300분' },
  { id: 'regular', name: '5G 프리미어 레귤러', price: '95,000', benefit: '940,000원', data: '데이터 무제한', voice: '통화 무제한, 문자 무제한', sub: '부가통화 300분' },
]
const TABS = [
  { id: 'plan', label: '요금제' },
  { id: 'contract', label: '약정안내' },
  { id: 'read', label: '필독사항' },
  { id: 'delivery', label: '개통방법' },
]

export default function ModelDetailPage() {
  const { slug } = useParams()
  const model = getModelBySlug(slug)
  const [carrier, setCarrier] = useState('lgu')
  const [color, setColor] = useState(null)
  const [plan, setPlan] = useState('super')
  const [installment, setInstallment] = useState('24')
  const [activeTab, setActiveTab] = useState('plan')

  if (!model) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <div className={styles.inner}>
            <p className={styles.notFound}>모델을 찾을 수 없습니다.</p>
            <Link to="/" className={styles.back}>← 셀프가입으로</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.inner}>
          <Link to="/" className={styles.back}>← 셀프가입으로</Link>

          {/* 상단: 왼쪽 이미지 + 오른쪽 상품정보 */}
          <section className={styles.topSection}>
            <div className={styles.leftCol}>
              <div className={styles.carrierLogo}>U+</div>
              <div className={styles.imageWrap}>
                <img
                  src={model.image}
                  alt={model.name}
                  className={styles.productImage}
                  onError={(e) => { e.target.src = PLACEHOLDER }}
                />
              </div>
            </div>
            <div className={styles.rightCol}>
              <h1 className={styles.modelName}>{model.name}</h1>
              <div className={styles.storageSelect}>
                <span>256GB</span>
                <span className={styles.arrow}>▼</span>
              </div>
              <div className={styles.priceRow}>
                <span className={styles.priceOriginal}>1,155,000원</span>
                <strong className={styles.priceSale}>115,000원</strong>
              </div>
              <div className={styles.infoCards}>
                <div className={styles.infoCard}>
                  <span className={styles.infoIcon}><IconSelfSignup /></span>
                  <div>
                    <p className={styles.infoTitle}>셀프가입 특가 상품</p>
                    <p className={styles.infoText}>상담 없이 직접 가입하면 혜택이 더 커요.</p>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <span className={styles.infoIcon}><IconHourglass /></span>
                  <div>
                    <p className={styles.infoTitle}>재고소진 시 혜택이 달라질 수 있어요</p>
                    <p className={styles.infoText}>통신사 온라인 신청서를 작성하면 혜택이 확정돼요.</p>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <span className={styles.infoIcon}><IconStore /></span>
                  <div>
                    <p className={styles.infoTitle}>Neirin Pyonagi</p>
                    <p className={styles.infoText}>본 상품은 Neirin Pyonagi에서 직접 판매하는 상품입니다.</p>
                  </div>
                </div>
              </div>
              <button type="button" className={styles.btnApply}>신청하기</button>
            </div>
          </section>

          {/* 하단: 왼쪽 통신사 선택 + 오른쪽 요금 상세 */}
          <section className={styles.bottomSection}>
            <div className={styles.leftCol}>
              <h2 className={styles.sectionTitle}>이용할 통신사</h2>
              <div className={styles.carrierCards}>
                {CARRIER_OPTIONS.map((c) => (
                  <label
                    key={c.id}
                    className={carrier === c.id ? styles.carrierCardActive : styles.carrierCard}
                  >
                    <input type="radio" name="carrier" value={c.id} checked={carrier === c.id} onChange={() => setCarrier(c.id)} />
                    <span className={styles.carrierLogoSmall}>{c.logo}</span>
                    <div className={styles.carrierText}>
                      <span className={styles.carrierLabel}>{c.label}</span>
                      <span className={styles.carrierDesc}>{c.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
              <p className={styles.note}>번호이동시 개통이 최대 2주까지 걸릴 수 있어요. <span className={styles.qMark}>?</span></p>

              <h2 className={styles.sectionTitle}>색상 <span className={styles.required}>색상을 선택해주세요</span></h2>
              <div className={styles.colorSwatches}>
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    disabled={c.soldOut}
                    className={c.soldOut ? styles.colorSwatchSoldOut : color === c.id ? styles.colorSwatchActive : styles.colorSwatch}
                    onClick={() => !c.soldOut && setColor(c.id)}
                  >
                    {c.soldOut ? '품절' : ''}
                  </button>
                ))}
              </div>

              <h2 className={styles.sectionTitle}>할인 방법</h2>
              <div className={styles.discountCards}>
                <div className={styles.discountCard}>
                  <strong>이통사지원금</strong>
                  <p>단말기 기기값을 할인받아요 (구 공시지원금)</p>
                </div>
                <div className={styles.discountCard}>
                  <strong>선택약정</strong>
                  <p>요금제에서 25% 할인 받아요</p>
                </div>
              </div>

              <h2 className={styles.sectionTitle}>요금제</h2>
              <div className={styles.planCards}>
                {PLANS.map((p) => (
                  <label key={p.id} className={plan === p.id ? styles.planCardActive : styles.planCard}>
                    <input type="radio" name="plan" value={p.id} checked={plan === p.id} onChange={() => setPlan(p.id)} />
                    <div className={styles.planCardContent}>
                      <strong>{p.name}</strong>
                      <p>{p.data}</p>
                      <p>{p.voice}</p>
                      <p>{p.sub}</p>
                      <a href="#plan-detail" className={styles.planLink}>요금제 상세안내</a>
                      <div className={styles.planPriceRow}>
                        <span>월 {p.price}원</span>
                        <span className={styles.planBenefit}>혜택 {p.benefit}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <h2 className={styles.sectionTitle}>단말기 할부 개월</h2>
              <div className={styles.installmentRow}>
                <button type="button" className={installment === '0' ? styles.installBtnActive : styles.installBtn} onClick={() => setInstallment('0')}>일시불</button>
                <button type="button" className={installment === '24' ? styles.installBtnActive : styles.installBtn} onClick={() => setInstallment('24')}>24개월</button>
              </div>

              <div className={styles.tabNav}>
                {TABS.map((t) => (
                  <button key={t.id} type="button" className={activeTab === t.id ? styles.tabNavActive : styles.tabNavBtn} onClick={() => setActiveTab(t.id)}>{t.label}</button>
                ))}
              </div>

              {activeTab === 'plan' && (
                <div className={styles.tabContent}>
                  <h3 className={styles.tabSubTitle}>요금제</h3>
                  <div className={styles.tabBlock}>
                    <strong>5G 프리미어 슈퍼</strong>
                    <p className={styles.tabBadge}>185일 사용</p>
                    <p>데이터 무제한 · 통화, 문자 무제한 · 부가통화 300분</p>
                    <p>기본 월 요금 115,000원 · 유지기간 개통 다음날부터 만 185일</p>
                    <p className={styles.tabNote}>만 185일 이내 변경시, 지원금을 전액 반환해야 해요. 만 185일 이후 45,000원 이상 요금제에서 자유롭게 변경할 수 있어요. 첫 달에만 유심비 7,700원을 추가해서 129,990원을 납부해요.</p>
                  </div>
                  <div className={styles.tabBlock}>
                    <strong>부가서비스 · 벨링모아B</strong>
                    <p className={styles.tabBadge}>93일 사용</p>
                    <p>월 요금 2,200원 · 유지기간 개통 다음날로부터 만 93일</p>
                    <p className={styles.tabNote}>유지기간 내 해지시, 판매점지원금 일부를 반환해야 해요.</p>
                  </div>
                </div>
              )}
              {activeTab === 'contract' && (
                <div className={styles.tabContent}>
                  <h3 className={styles.tabSubTitle}>약정안내</h3>
                  <div className={styles.tabBlock}>
                    <strong>LG U+통신사 / 번호이동</strong>
                    <p className={styles.tabBadge}>2년 약정</p>
                    <p>약정을 2년간 유지해주세요. 통신사만 LG U+로 변경돼요. 번호는 바뀌지 않으니 안심하세요. 개통까지 평균 1~2주 정도 소요될 수 있어요.</p>
                  </div>
                  <h3 className={styles.tabSubTitle}>위약금 안내</h3>
                  <ul className={styles.tabList}>
                    <li>요금제: 만 185일 이내 변경시, 지원금을 전액 반환해야 해요. 만 185일 이후 45,000원 이상 요금제에서 자유롭게 변경할 수 있어요.</li>
                    <li>부가서비스: 유지기간 내 해지시, 판매점지원금 일부를 반환해야 해요.</li>
                    <li>이통사지원금 / 유통망지원금: 185일 이내 해지하면 전액 반환. 185일 후 해지시 사용기간에 따라 일부 반환.</li>
                  </ul>
                </div>
              )}
              {activeTab === 'read' && (
                <div className={styles.tabContent}>
                  <h3 className={styles.tabSubTitle}>필독사항</h3>
                  <ul className={styles.faqList}>
                    <li>셀프가입은 어떻게 진행되나요?</li>
                    <li>해피콜은 언제 오나요?</li>
                    <li>해피콜과 셀프톡이 다른 건가요?</li>
                    <li>구매하려는 색상이나 기기가 없어요. 어떻게 신청하나요?</li>
                    <li>후기 사은품은 받을 수 없나요?</li>
                    <li>신청관련 자주 묻는 질문</li>
                    <li>배송관련 자주 묻는 질문</li>
                    <li>취소관련 자주 묻는 질문</li>
                    <li>개통관련 자주 묻는 질문</li>
                  </ul>
                </div>
              )}
              {activeTab === 'delivery' && (
                <div className={styles.tabContent}>
                  <h3 className={styles.tabSubTitle}>개통방법</h3>
                  <ol className={styles.stepsList}>
                    <li><strong>신청서 작성</strong> — 유지조건, 위약금 발생 조건을 잘 확인하신 후 온라인 신청서를 작성해주세요. 각 통신사 온라인 신청서 작성까지 마치셔야 신청이 완료돼요.</li>
                    <li><strong>알림톡 또는 해피콜 발송</strong> — 고객정보 확인을 위해 알림톡 또는 해피콜을 드려요.</li>
                    <li><strong>휴대폰 택배수령</strong> — 오후 4시 전까지 단말기 배정이 완료된 주문은 당일 발송해드려요.</li>
                    <li><strong>개통완료</strong> — 통신사이동 시 1~2주 소요. 기기변경 시 휴대폰 택배수령 후 유심만 변경해서 넣으시면 돼요.</li>
                  </ol>
                  <h3 className={styles.tabSubTitle}>취소/교환/불량 안내</h3>
                  <p className={styles.tabNote}>박스 개봉 및 개통 후에는 모델 변경, 취소, 교환이 불가능해요. 14일 이내 불량 시 삼성 서비스센터에서 교품증 발급 후 교환 가능해요. 개봉 시 언박싱 영상 촬영을 권장 드려요.</p>
                </div>
              )}

              <h2 className={styles.sectionTitle} id="reviews">구매후기</h2>
              <div className={styles.reviewList}>
                <div className={styles.reviewCard}>
                  <p className={styles.reviewTitle}>상담 없이도 쉽게 가입 완료!</p>
                  <p className={styles.reviewText}>가입 혜택이 정말 다양해서 망설임 없이 선택했어요. 별다른 복잡한 과정 없이 앱에서 바로 신청하고, 당일에 개통까지 되어 완전히 만족합니다.</p>
                </div>
                <div className={styles.reviewCard}>
                  <p className={styles.reviewTitle}>내가 고른 요금제로 당일에 바로 개통!</p>
                  <p className={styles.reviewText}>영업 전화나 추가 상담 없이, 내가 원하는 요금제만 골라서 한 번에 처리됐어요. 당일에 바로 개통되어 생각보다 훨씬 쉽게 서비스를 이용할 수 있었습니다.</p>
                </div>
              </div>
            </div>
            <div className={styles.rightCol}>
              <h3 className={styles.summaryCardTitle}>{model.name}</h3>
              <div className={styles.storageSelect}>
                <span>256GB</span>
                <span className={styles.arrow}>▼</span>
              </div>
              <div className={styles.summaryCard}>
                <div className={styles.priceBlock}>
                  <p className={styles.detailGroup}>휴대폰</p>
                  <div className={styles.detailRow}>
                    <span>할부원금</span>
                    <span className={styles.detailValueBold}>5,090원</span>
                  </div>
                  <div className={styles.detailRowIndent}>
                    <span>출고가</span>
                    <span>1,155,000원</span>
                  </div>
                  <div className={styles.detailRowIndent}>
                    <span>이통사지원금</span>
                    <span className={styles.minus}>-500,000원</span>
                  </div>
                  <div className={styles.detailRowIndent}>
                    <span>유통망지원금</span>
                    <span className={styles.minus}>-540,000원</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>단말기 월 할부금 <span className={styles.badge}>24개월</span></span>
                    <span className={styles.detailValueBold}>4,790원</span>
                  </div>
                  <div className={styles.detailRowIndent}>
                    <span>단말기 월 할부이자</span>
                    <span>300원</span>
                  </div>
                </div>
                <div className={styles.priceBlock}>
                  <div className={styles.detailRowGroupHeader}>
                    <p className={styles.detailGroup}>요금제</p>
                    <span className={styles.detailValueBold}>117,200원</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>5G 프리미어 슈퍼 <span className={styles.badge}>185일 유지</span></span>
                    <span>115,000원</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>부가서비스</span>
                    <span>2,200원</span>
                  </div>
                  <div className={styles.detailRowIndent}>
                    <span>벨링모아B</span>
                    <span>2,200원</span>
                  </div>
                  <div className={styles.detailRowIndent}>
                    <span>93일 유지</span>
                    <span></span>
                  </div>
                </div>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>월 납부 예상 금액 VAT 포함</span>
                  <span className={styles.totalValue}>122,290원</span>
                </div>
              </div>
              <button type="button" className={styles.btnApplyFull}>신청하기</button>
            </div>
          </section>
        </div>
      </main>
      <Footer />

      <a href="#faq" className={styles.faqBtn}>FAQ</a>
    </div>
  )
}
