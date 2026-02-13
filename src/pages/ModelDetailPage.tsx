import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getModelBySlug } from '../data/models'
import { generateArsCode as apiGenerateArsCode, verifyArsCode as apiVerifyArsCode } from '../libs/api'
import { IconSelfSignup, IconHourglass, IconStore } from '../components/InfoCardIcons'
import styles from './ModelDetailPage.module.css'

const PLACEHOLDER = 'https://placehold.co/400x600/e5e7eb/9ca3af?text=Phone'

interface CarrierOption {
  id: string;
  label: string;
  desc: string;
  logo: string;
}

interface ColorOption {
  id: string;
  name: string;
  hex: string;
  soldOut: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  benefit: string;
  data: string;
  voice: string;
  sub: string;
}

interface Tab {
  id: string;
  label: string;
}

interface NoticeStep {
  id: number;
  title: string;
  items: string[];
}

const CARRIER_OPTIONS: CarrierOption[] = [
  { id: 'skt', label: 'SKT / 번호이동', desc: '쓰던 번호 그대로, 통신사만 변경할게요', logo: 'T' },
  { id: 'kt', label: 'KT / 기기변경', desc: '이용중인 KT통신사에서 휴대폰만 바꾸고 싶어요', logo: 'kt' },
  { id: 'lgu', label: 'LG U+ / 번호이동', desc: '쓰던 번호 그대로, 통신사만 변경할게요', logo: 'U+' },
]

const COLOR_OPTIONS: ColorOption[] = [
  { id: 'c1', name: '블랙', hex: '#111827', soldOut: true },
  { id: 'c2', name: '화이트', hex: '#f3f4f6', soldOut: true },
  { id: 'c3', name: '라벤더', hex: '#e5e0ff', soldOut: true },
  { id: 'c4', name: '그레이', hex: '#d1d5db', soldOut: true },
  { id: 'c5', name: '네이비', hex: '#0f172a', soldOut: false },
]
const PLANS: Plan[] = [
  { id: 'super', name: '5G 프리미어 슈퍼', price: '115,000', benefit: '1,040,000원', data: '데이터 무제한', voice: '통화 무제한, 문자 무제한', sub: '부가통화 300분' },
  { id: 'regular', name: '5G 프리미어 레귤러', price: '95,000', benefit: '940,000원', data: '데이터 무제한', voice: '통화 무제한, 문자 무제한', sub: '부가통화 300분' },
]
const TABS: Tab[] = [
  { id: 'plan', label: '요금제' },
  { id: 'contract', label: '약정안내' },
  { id: 'read', label: '필독사항' },
  { id: 'delivery', label: '개통방법' },
]

const SERVICE_TERMS_TEXT: string[] = [
  '본 (필수) 비회원 서비스 이용약관은 내일은편하게 서비스 이용과 관련하여 적용돼요.',
  '',
  '제1조 (신청 전 유의사항)',
  '1. 개통 후 단순변심(디자인, 색상 등)으로 인한 취소는 불가합니다.',
  '2. 기기변경 신청 시 선개통(기존 유심 재사용)으로 진행되며, 기존 유심 개통 시 기존 휴대폰이 끊길 수 있습니다. 기존 휴대폰을 2~3회 재부팅해주시면 사용 가능합니다.',
  '3. 번호이동 신청 시 후개통(유심비 7,700원 청구)으로 진행되며, 택배 배송 기간 동안 기존폰 사용이 불가할 수 있습니다. 비상연락처를 반드시 기재해 주세요.',
  '4. 회선/요금제 유지기간 조건을 지키지 않을 경우 지급된 사은품 등을 반환해야 합니다(통신사 위약금은 별도 청구).',
  '5. 개통 후 90일 동안 매월 통화 10건 이상, 15분 이상의 통화량이 발생해야 합니다. 통화이력이 없을 경우 위법 사용자로 간주되어 출고가로 재개통될 수 있습니다.',
  '6. 휴대폰 보험 가입 가능 기간은 개통 후 60일 이내이며, 한 달이 지나면 가입이 불가할 수 있습니다.',
  '7. 복지할인/기초수급자/국가유공자/결합할인 등 기존 통신사 할인혜택은 기기변경 시 유지될 수 있으나, 조건 및 할인율이 변동될 수 있으니 통신사 고객센터를 통해 반드시 확인해주세요.',
  '8. 현재 사용 중인 통신사 부가서비스 및 결합상품 혜택은 개통 진행 시 변경 또는 해지될 수 있습니다. 신청 전 해당 통신사 고객센터를 통해 확인해주세요.',
  '9. 온라인 정책은 수시로 변경될 수 있으며, 재고소진 또는 조건 변동으로 신청이 자동 취소될 수 있습니다. 개통 후 공시지원금 변동이 있어도 소급적용은 불가합니다.',
  '',
  '제2조 (반품 및 교환 안내사항)',
  '1. 박스 개봉 및 개통 이후에는 단순변심으로 인한 취소/교환이 불가합니다. 모델별 교환 및 취소 조건을 꼭 확인해 주세요.',
  '2. 애플 단말기(아이폰, 아이패드 등)는 제조사 A/S 센터를 통해서만 처리가 가능합니다.',
  '3. 불량 단말기 수령 시 14일 이내 동일 기종으로 교환 가능하며, 제조사 A/S 센터에서 불량확인서를 발급받아야 합니다. 구성품이 모두 온전하게 있어야 교환이 가능합니다.',
  '',
  '부칙',
  '본 약관은 시행일로부터 적용되며, 관련 법령 또는 내용 변경 시 최소 7일 전(중대한 변경 시 14일 전) 사전 고지합니다.',
  '서비스 이용약관 시행일자: 2026년 1월 22일 / 변경일자: 2026년 1월 15일',
]

const PRIVACY_TERMS_TEXT: string[] = [
  '㈜내일은편하게모바일 개인정보 제3자 제공 및 활용에 대한 동의',
  '',
  '주식회사 내일은편하게모바일(이하 "회사"라 합니다)은 고객에게 사전 동의를 받은 범위 내에서만 개인정보를 제3자에게 제공합니다.',
  '단, 「개인정보 보호법」 제17조 및 제18조에 따라 법령에 근거가 있거나 그에 준하는 정당한 사유가 있는 경우에는 고객의 동의 없이도 제3자에게 제공할 수 있습니다.',
  '향후 개인정보를 제공받는 제3자와의 신규 계약 체결, 계약 해지 또는 기타 계약 내용의 변경이 있을 수 있으며, 이 경우 개인정보처리방침을 통해 사전에 고지합니다.',
  '',
  '1) 개인정보의 제3자 제공',
  '제공받는 자: ㈜일구통신, ㈜제이씨컴퍼니, ㈜에스와이미디어, ㈜다음네트웍스, ㈜경성컴퍼니, ㈜애프지',
  '제공 목적: 휴대폰 서비스 가입',
  '제공 정보: 이름, 생년월일, 휴대폰 번호 가운데 4자리, 성별',
  '보유 및 이용 기간: 개인정보의 수집 또는 제공받는 목적이 달성되면 파기하며, 관계 법령에 따라 보존이 필요한 경우에는 해당 기간까지 보관 후 파기합니다.',
  '',
  '* 본 개인정보 제3자 제공 및 활용 동의는 원활한 서비스 가입 및 이용을 위해 진행되고 있으며, 동의하지 않으실 경우 서비스 가입 및 이용에 제약이 발생할 수 있습니다.',
  '',
  '2) 개인정보의 처리위탁',
  '회사는 원활한 서비스 제공과 효과적인 업무처리를 위하여 다음과 같이 개인정보 처리를 위탁하고 있습니다.',
  '',
  '(1) 개인정보 국내 처리위탁',
  '• 수탁자: ㈜카카오, ㈜다우기술, ㈜네이버 등',
  '• 위탁업무: SMS/LMS 및 이메일, 알림톡/친구톡 발송, 마케팅 및 서비스 개선 등',
  '• 보유 및 이용기간: 관계 법령에 따른 보관의무 기간 또는 회원 탈퇴 및 위탁 계약 종료 시까지 보관 후 파기',
  '',
  '(2) 개인정보 국외 처리위탁',
  '• 이전 받는 자: Google LLC, Meta Platforms, Inc.(Facebook), Taboola, Inc. 등',
  '• 이전되는 국가: 미국 등',
  '• 이전 목적: 연구개발, 마케팅 및 서비스 개선',
  '• 이전 항목: 서비스 이용 과정에서 수집·생성되는 개인정보 일체',
  '• 보유 및 이용기간: 업무 완료 시 지체 없이 파기',
]

const NOTICE_STEPS: NoticeStep[] = [
  {
    id: 1,
    title: '요금제 유지기간을 확인해주세요. 유지기간 내 요금제를 변경하면 위약금이 발생해요.',
    items: [
      '5GX 프리미엄 요금제를 만 185일 사용해요.',
      '만 185일 이내 변경시, 지원금을 전액 반환해야 해요.',
      '만 185일 이후 42,000원 이상 요금제에서 자유롭게 변경할 수 있어요.',
      '첫 달에만 유심비 7,700원을 추가해서 138,040원을 납부해요.',
    ],
  },
  {
    id: 2,
    title: 'SKT 통신사를 2년간 유지해주세요. 약정을 해지하면 위약금이 발생해요.',
    items: [
      '공통지원금 / 추가지원금',
      '185일 이내 해지하면 전액 반환해야 해요.',
      '185일 후, 해지하면 사용기간에 따라 일부 반환해야 해요.',
    ],
  },
  {
    id: 3,
    title: '번호이동 유의사항을 확인해주세요.',
    items: [
      '번호이동시 개통이 최대 2주까지 걸릴 수 있어요.',
      '첫 달에만 유심비 7,700원을 추가 납부해요.',
    ],
  },
  {
    id: 4,
    title: '개통후 185일 이내 정지, 해지, 유심·기기변경, 명의 변경, 미사용 시 판매점지원금이 전액 환수돼요.',
    items: [],
  },
  {
    id: 5,
    title: '개통완료 전까지 기기는 개봉하지 말아주세요. 박스 개봉 및 개통 후 모델변경, 취소, 교환 불가능해요. 초기불량 발생 시, 제조사 서비스센터 방문(14일 이내)해주세요.',
    items: [],
  },
  {
    id: 6,
    title: '통신사 온라인 신청서를 작성하면 지원금이 확정돼요.',
    items: [
      '통신사 온라인 신청서 작성 전에는 지원금이 변경될 수 있어요.',
      '온라인 신청서를 작성하여 지원금 확정 후에는 지원금 변경이 불가능해요.',
    ],
  },
]

type StepParam = 'owner' | 'identity' | 'notice' | 'agreement' | 'ars'

export default function ModelDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const model = getModelBySlug(slug || '')
  const [searchParams, setSearchParams] = useSearchParams()

  const [carrier, setCarrier] = useState<string>('lgu')
  const [color, setColor] = useState<string | null>(null)
  const [plan, setPlan] = useState<string>('super')
  const [installment, setInstallment] = useState<string>('24')
  const [activeTab, setActiveTab] = useState<string>('plan')
  const [modalStep, setModalStep] = useState<string | null>(null) // null | 'auth' | 'color'
  const [ownerType, setOwnerType] = useState<string | null>(null) // null | 'self' | 'family'
  const [gender, setGender] = useState<string | null>(null) // null | 'male' | 'female'
  const [birthYear, setBirthYear] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [phoneMid, setPhoneMid] = useState('')
  const [phoneLast, setPhoneLast] = useState('')

  const stepParam = searchParams.get('step') // null | 'owner' | 'identity' | 'notice' | 'agreement' | 'ars'
  const wizardStep =
    stepParam === 'owner' ? 1 :
    stepParam === 'identity' ? 2 :
    stepParam === 'notice' ? 3 :
    stepParam === 'agreement' ? 4 :
    stepParam === 'ars' ? 5 : 0

  const goToStep = (step: StepParam | null) => {
    const next = new URLSearchParams(searchParams)
    if (!step) {
      next.delete('step')
    } else {
      next.set('step', step)
    }
    setSearchParams(next)
  }

  const birthFull = birthYear.length === 4 && birthMonth.length === 2 && birthDay.length === 2

  const selectedColor = COLOR_OPTIONS.find((c) => c.id === color)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [noticeChecked, setNoticeChecked] = useState<boolean[]>(
    () => NOTICE_STEPS.map(() => false),
  )
  const allNoticesChecked = noticeChecked.every(Boolean)
  const [agreeAll, setAgreeAll] = useState(false)
  const [agreeService, setAgreeService] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [showServiceTerms, setShowServiceTerms] = useState(false)
  const [showPrivacyTerms, setShowPrivacyTerms] = useState(false)
  const [arsId, setArsId] = useState<string | null>(null)
  const [arsCode, setArsCode] = useState('')
  const [arsPhone, setArsPhone] = useState('010-8477-9503')
  const [arsTimer, setArsTimer] = useState(180)
  const [arsLoading, setArsLoading] = useState(false)
  const [arsError, setArsError] = useState('')
  const arsIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startArsTimer = useCallback(async () => {
    setArsLoading(true)
    setArsError('')
    try {
      const result = await apiGenerateArsCode('01084779503')
      setArsId(result.arsId)
      setArsCode(result.arsCode)
      setArsPhone(result.arsPhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))
      setArsTimer(result.expiresInSeconds)
    } catch (err: unknown) {
      // Backend ulana olmasa, demo rejimda ishlaydi
      const code = String(Math.floor(100000 + Math.random() * 900000))
      setArsCode(code)
      setArsTimer(180)
      setArsId(null)
      console.log('ARS API mavjud emas, demo rejim:', err instanceof Error ? err.message : err)
    }
    setArsLoading(false)

    if (arsIntervalRef.current) clearInterval(arsIntervalRef.current)
    arsIntervalRef.current = setInterval(() => {
      setArsTimer((prev) => {
        if (prev <= 1) {
          clearInterval(arsIntervalRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  useEffect(() => {
    if (wizardStep === 5) startArsTimer()
    return () => { if (arsIntervalRef.current) clearInterval(arsIntervalRef.current) }
  }, [wizardStep, startArsTimer])

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
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = PLACEHOLDER }}
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
                    <p className={styles.infoTitle}>내일은편하게 mobile</p>
                    <p className={styles.infoText}>본 상품은 내일은편하게 mobile에서 직접 판매하는 상품입니다.</p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className={styles.btnApply}
                onClick={() => goToStep('owner')}
              >
                신청하기
              </button>
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
                {COLOR_OPTIONS.map((c) => {
                  const isSelected = color === c.id
                  return (
                    <button
                      key={c.id}
                      type="button"
                      disabled={c.soldOut}
                      className={
                        c.soldOut
                          ? styles.colorSwatchSoldOut
                          : isSelected
                          ? styles.colorSwatchActive
                          : styles.colorSwatch
                      }
                      style={{ '--swatch-color': c.hex } as React.CSSProperties}
                      onClick={() => !c.soldOut && setColor(c.id)}
                    >
                      {c.soldOut ? '품절' : ''}
                    </button>
                  )
                })}
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
              <button
                type="button"
                className={styles.btnApplyFull}
                onClick={() => goToStep('owner')}
              >
                신청하기
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />

      {false && modalStep && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setModalStep(null)}
        >
          <div
            className={styles.modal}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setModalStep(null)}
            >
              ✕
            </button>

            {modalStep === 'auth' && (
              <>
                <h2 className={styles.modalTitle}>로그인</h2>
                <p className={styles.modalText}>
                  휴대폰 셀프가입 신청을 위해 로그인 해주세요.
                </p>
                <button
                  type="button"
                  className={styles.modalPrimary}
                  onClick={() => {
                    // keyin /login routenga navigate qilishni oson qo'shamiz
                    setModalStep('color')
                  }}
                >
                  로그인 / 회원가입
                </button>
                <button
                  type="button"
                  className={styles.modalSecondary}
                  onClick={() => setModalStep('color')}
                >
                  비회원 신청하기
                </button>
              </>
            )}

            {modalStep === 'color' && (
              <>
                <h2 className={styles.modalTitle}>색상을 선택해주세요</h2>
                <div className={styles.modalColorRow}>
                  <span className={styles.modalColorLabel}>색상</span>
                  <span className={styles.modalColorHelp}>색상을 선택해주세요</span>
                </div>
                <div className={`${styles.colorSwatches} ${styles.modalColorSwatches}`}>
                  {COLOR_OPTIONS.map((c) => {
                    const isSelected = color === c.id
                    return (
                      <button
                        key={c.id}
                        type="button"
                        disabled={c.soldOut}
                        className={
                          c.soldOut
                            ? styles.colorSwatchSoldOut
                            : isSelected
                            ? styles.colorSwatchActive
                            : styles.colorSwatch
                        }
                        style={{ '--swatch-color': c.hex } as React.CSSProperties}
                        onClick={() => !c.soldOut && setColor(c.id)}
                      >
                        {c.soldOut ? '품절' : ''}
                      </button>
                    )
                  })}
                </div>
                <p className={styles.modalSelectedText}>
                  {selectedColor
                    ? `${selectedColor?.name} 색상을 선택했어요.`
                    : '색상을 선택해주세요.'}
                </p>
                <button
                  type="button"
                  className={`${styles.modalPrimary} ${!selectedColor ? styles.modalPrimaryDisabled : ''}`}
                  disabled={!selectedColor}
                  onClick={() => {
                    if (!selectedColor) return
                    setModalStep(null)
                    goToStep('owner')
                  }}
                >
                  신청하기
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {wizardStep === 1 && (
        <div className={styles.stepOverlay}>
          <button type="button" className={styles.stepCloseBtn} onClick={() => goToStep(null)}>✕</button>
          <div className={styles.stepCard}>
            <div className={styles.stepper}>
              <div className={styles.stepperItem}><span className={styles.stepperCurrent}>1</span></div>
              <div className={styles.stepperLine} />
              <div className={styles.stepperItem}><span className={styles.stepperNum}>2</span></div>
              <div className={styles.stepperLine} />
              <div className={styles.stepperItem}><span className={styles.stepperNum}>3</span></div>
              <div className={styles.stepperLine} />
              <div className={styles.stepperItem}><span className={styles.stepperNum}>4</span></div>
              <div className={styles.stepperLine} />
              <div className={styles.stepperItem}><span className={styles.stepperNum}>5</span></div>
            </div>
            <h2 className={styles.stepTitle}>본인명의 휴대폰을 개통하시나요?</h2>
            <div className={styles.stepOptions}>
              <button
                type="button"
                className={ownerType === 'self' ? styles.stepOptionActive : styles.stepOption}
                onClick={() => setOwnerType('self')}
              >
                <strong>본인</strong>
                <span>제가 사용할 거예요</span>
              </button>
              <button
                type="button"
                className={ownerType === 'family' ? styles.stepOptionActive : styles.stepOption}
                onClick={() => setOwnerType('family')}
              >
                <strong>가족</strong>
                <span>휴대폰을 대신 신청</span>
              </button>
            </div>
            <button
              type="button"
              className={`${styles.stepNextBtn} ${ownerType ? styles.stepNextBtnActive : ''}`}
              disabled={!ownerType}
              onClick={() => ownerType && goToStep('identity')}
            >
              다음
            </button>
          </div>
        </div>
      )}

      {wizardStep === 2 && (
        <div className={styles.stepOverlay}>
          <button type="button" className={styles.stepCloseBtn} onClick={() => goToStep(null)}>✕</button>
          <div className={styles.stepCard}>
            <div className={styles.stepper}>
              <div className={styles.stepperItem}><span className={styles.stepperDone}>✓</span></div>
              <div className={styles.stepperLine + ' ' + styles.stepperLineDone} />
              <div className={styles.stepperItem}><span className={styles.stepperCurrent}>2</span></div>
              <div className={styles.stepperLine} />
              <div className={styles.stepperItem}><span className={styles.stepperNum}>3</span></div>
              <div className={styles.stepperLine} />
              <div className={styles.stepperItem}><span className={styles.stepperNum}>4</span></div>
              <div className={styles.stepperLine} />
              <div className={styles.stepperItem}><span className={styles.stepperNum}>5</span></div>
            </div>
            <h2 className={styles.stepTitle}>개통할 본인의 정보를 입력해주세요.</h2>

            <div className={styles.stepField}>
              <p className={styles.stepFieldLabel}>성별</p>
              <div className={styles.stepGenderRow}>
                <button
                  type="button"
                  className={gender === 'male' ? styles.stepGenderActive : styles.stepGenderBtn}
                  onClick={() => setGender('male')}
                >
                  남성
                </button>
                <button
                  type="button"
                  className={gender === 'female' ? styles.stepGenderActive : styles.stepGenderBtn}
                  onClick={() => setGender('female')}
                >
                  여성
                </button>
              </div>
            </div>

            <div className={styles.stepField}>
              <p className={styles.stepFieldLabel}>생년월일 8자리</p>
              <div className={styles.stepBirthRow}>
                <input
                  type="text"
                  placeholder="2000"
                  className={`${styles.stepInput} ${styles.stepInputYear}`}
                  maxLength={4}
                  value={birthYear}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 4)
                    if (digits.length === 4) {
                      const y = parseInt(digits, 10)
                      if (y < 1900 || y > new Date().getFullYear()) return
                    }
                    setBirthYear(digits)
                  }}
                />
                <span className={styles.stepBirthDash}>-</span>
                <input
                  type="text"
                  placeholder="01"
                  className={`${styles.stepInput} ${styles.stepInputMD}`}
                  maxLength={2}
                  value={birthMonth}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 2)
                    if (digits.length === 2) {
                      const m = parseInt(digits, 10)
                      if (m < 1 || m > 12) return
                    }
                    setBirthMonth(digits)
                  }}
                />
                <span className={styles.stepBirthDash}>-</span>
                <input
                  type="text"
                  placeholder="01"
                  className={`${styles.stepInput} ${styles.stepInputMD}`}
                  maxLength={2}
                  value={birthDay}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 2)
                    if (digits.length === 2) {
                      const d = parseInt(digits, 10)
                      const y = parseInt(birthYear, 10) || 2000
                      const m = parseInt(birthMonth, 10) || 1
                      const maxDay = new Date(y, m, 0).getDate()
                      if (d < 1 || d > maxDay) return
                    }
                    setBirthDay(digits)
                  }}
                />
              </div>
            </div>

            <div className={styles.stepField}>
              <p className={styles.stepFieldLabel}>휴대폰 번호 가운데 4자리</p>
              <div className={styles.stepPhoneRow}>
                <input
                  type="text"
                  value="010"
                  readOnly
                  className={`${styles.stepInput} ${styles.stepInputSmall} ${styles.stepInputReadonly}`}
                />
                <span className={styles.stepPhoneDash}>-</span>
                <input
                  type="text"
                  placeholder="0000"
                  className={`${styles.stepInput} ${styles.stepInputSmall}`}
                  value={phoneMid}
                  maxLength={4}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 4)
                    setPhoneMid(digits)
                  }}
                />
                <span className={styles.stepPhoneDash}>-</span>
                <input
                  type="password"
                  placeholder="****"
                  className={`${styles.stepInput} ${styles.stepInputSmall} ${styles.stepInputReadonly}`}
                  value="****"
                  readOnly
                />
              </div>
            </div>

            {/** Next button faolligi: o'rtadagi 4 ta raqam to'liq bo'lsa */}
            {(() => {
              const onlyDigits = /^\d{4}$/.test(phoneMid)
              const enabled = onlyDigits && birthFull && !!gender
              return (
                <button
                  type="button"
                  className={`${styles.stepNextBtn} ${enabled ? styles.stepNextBtnActive : ''}`}
                  disabled={!enabled}
                  onClick={() => enabled && goToStep('notice')}
                >
                  다음
                </button>
              )
            })()}
          </div>
        </div>
      )}

      {wizardStep === 3 && (
        <div className={styles.stepOverlay}>
          <button type="button" className={styles.stepCloseBtn} onClick={() => goToStep(null)}>✕</button>
          <div className={styles.stepCard}>
            <div className={styles.stepper}>
              <div className={styles.stepperItem}><span className={styles.stepperDone}>✓</span></div>
              <div className={styles.stepperLine + ' ' + styles.stepperLineDone} />
              <div className={styles.stepperItem}><span className={styles.stepperDone}>✓</span></div>
              <div className={styles.stepperLine + ' ' + styles.stepperLineDone} />
              <div className={styles.stepperItem}><span className={styles.stepperCurrent}>3</span></div>
              <div className={styles.stepperLine} />
              <div className={styles.stepperItem}><span className={styles.stepperNum}>4</span></div>
              <div className={styles.stepperLine} />
              <div className={styles.stepperItem}><span className={styles.stepperNum}>5</span></div>
            </div>
            <h2 className={styles.stepTitle}>상품 유의사항을 확인해주세요</h2>

            {NOTICE_STEPS.map((n, idx) => (
              <div key={n.id} className={styles.noticeBlock}>
                <div className={styles.noticeHeader}>
                  <p className={styles.noticeTitle}>{n.title}</p>
                </div>
                {n.items.length > 0 && (
                  <ul className={styles.noticeList}>
                    {n.items.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                <label className={styles.noticeCheckLabel}>
                  <input
                    type="checkbox"
                    checked={noticeChecked[idx]}
                    onChange={() =>
                      setNoticeChecked((prev) => {
                        const copy = [...prev]
                        copy[idx] = !copy[idx]
                        return copy
                      })
                    }
                    className={styles.noticeCheckbox}
                  />
                  <span className={styles.noticeCheckText}>확인했어요</span>
                </label>
              </div>
            ))}

            <button
              type="button"
              className={styles.noticeAllBtn}
              onClick={() => {
                if (!allNoticesChecked) {
                  setNoticeChecked(NOTICE_STEPS.map(() => true))
                } else {
                  goToStep('agreement')
                }
              }}
            >
              {allNoticesChecked ? '다음' : '모두 확인했어요'}
            </button>
          </div>
        </div>
      )}

      {wizardStep === 4 && (
        <div className={styles.stepOverlay}>
          <button type="button" className={styles.stepCloseBtn} onClick={() => goToStep(null)}>✕</button>
          <div className={styles.stepCard}>
            <div className={styles.stepper}>
              <div className={styles.stepperItem}><span className={styles.stepperDone}>✓</span></div>
              <div className={styles.stepperLine + ' ' + styles.stepperLineDone} />
              <div className={styles.stepperItem}><span className={styles.stepperDone}>✓</span></div>
              <div className={styles.stepperLine + ' ' + styles.stepperLineDone} />
              <div className={styles.stepperItem}><span className={styles.stepperDone}>✓</span></div>
              <div className={styles.stepperLine + ' ' + styles.stepperLineDone} />
              <div className={styles.stepperItem}><span className={styles.stepperCurrent}>4</span></div>
              <div className={styles.stepperLine} />
              <div className={styles.stepperItem}><span className={styles.stepperNum}>5</span></div>
            </div>
            <h2 className={styles.stepTitle}>약관동의</h2>

            <div className={styles.agreeSummary}>
              <p className={styles.agreeLabel}>변경할 통신사</p>
              <p className={styles.agreeValue}>
                {CARRIER_OPTIONS.find((c) => c.id === carrier)?.label || 'SKT / 번호이동'}
              </p>
              <p className={styles.agreeLabel}>단말기</p>
              <p className={styles.agreeValue}>
                {model.name} 256GB {selectedColor?.name || ''}
              </p>
            </div>

            <div className={styles.agreeBox}>
              <label className={styles.agreeRow}>
                <div className={styles.agreeRowLeft}>
                  <input
                    type="checkbox"
                    checked={agreeAll}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const checked = e.target.checked
                      setAgreeAll(checked)
                      setAgreeService(checked)
                      setAgreePrivacy(checked)
                    }}
                  />
                  <span className={styles.agreeText}>전체 동의</span>
                </div>
              </label>
              <label className={styles.agreeRow}>
                <div className={styles.agreeRowLeft}>
                  <input
                    type="checkbox"
                    checked={agreeService}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const checked = e.target.checked
                      setAgreeService(checked)
                      setAgreeAll(checked && agreePrivacy)
                    }}
                  />
                  <span className={styles.agreeText}>(필수) 비회원 서비스 이용약관</span>
                </div>
                <button
                  type="button"
                  className={`${styles.agreeMore} ${showServiceTerms ? styles.agreeMoreOpen : ''}`}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setShowServiceTerms((prev) => !prev)
                  }}
                >
                  &gt;
                </button>
              </label>
              {showServiceTerms && (
                <div className={styles.agreeDetail}>
                  <p className={styles.agreeDetailTitle}>(주)내일은편하게 서비스 이용약관</p>
                  {SERVICE_TERMS_TEXT.map((line) => (
                    <p key={line} className={styles.agreeDetailText}>
                      {line}
                    </p>
                  ))}
                </div>
              )}
              <label className={styles.agreeRow}>
                <div className={styles.agreeRowLeft}>
                  <input
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const checked = e.target.checked
                      setAgreePrivacy(checked)
                      setAgreeAll(checked && agreeService)
                    }}
                  />
                  <span className={styles.agreeText}>(필수) 개인정보 제3자 제공 및 활용 동의</span>
                </div>
                <button
                  type="button"
                  className={`${styles.agreeMore} ${showPrivacyTerms ? styles.agreeMoreOpen : ''}`}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setShowPrivacyTerms((prev) => !prev)
                  }}
                >
                  &gt;
                </button>
              </label>
              {showPrivacyTerms && (
                <div className={styles.agreeDetail}>
                  <p className={styles.agreeDetailTitle}>㈜내일은편하게모바일 개인정보 제3자 제공 및 활용 동의</p>
                  {PRIVACY_TERMS_TEXT.map((line) => (
                    <p key={line} className={styles.agreeDetailText}>
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className={`${styles.agreeBtn} ${agreeService && agreePrivacy ? styles.agreeBtnActive : ''}`}
              disabled={!(agreeService && agreePrivacy)}
              onClick={() => agreeService && agreePrivacy && goToStep('ars')}
            >
              약관동의
            </button>
          </div>
        </div>
      )}

      {wizardStep === 5 && (
        <div className={styles.stepOverlay}>
          <button type="button" className={styles.stepCloseBtn} onClick={() => goToStep(null)}>✕</button>
          <div className={styles.stepCard}>
            <div className={styles.stepper}>
              <div className={styles.stepperItem}><span className={styles.stepperDone}>✓</span></div>
              <div className={styles.stepperLine + ' ' + styles.stepperLineDone} />
              <div className={styles.stepperItem}><span className={styles.stepperDone}>✓</span></div>
              <div className={styles.stepperLine + ' ' + styles.stepperLineDone} />
              <div className={styles.stepperItem}><span className={styles.stepperDone}>✓</span></div>
              <div className={styles.stepperLine + ' ' + styles.stepperLineDone} />
              <div className={styles.stepperItem}><span className={styles.stepperDone}>✓</span></div>
              <div className={styles.stepperLine + ' ' + styles.stepperLineDone} />
              <div className={styles.stepperItem}><span className={styles.stepperCurrent}>5</span></div>
            </div>
            {arsTimer <= 0 && !arsLoading ? (
              <>
                <h2 className={styles.stepTitle}>인증번호가 만료되었어요</h2>
                <p className={styles.arsExpiredDesc}>인증번호를 재발급 받은 후</p>
                <p className={styles.arsExpiredDesc}>ARS 인증을 진행해주세요.</p>
                <button
                  type="button"
                  className={styles.arsReissueBtn}
                  onClick={() => startArsTimer()}
                >
                  ↻ 인증번호 재발급
                </button>
              </>
            ) : (
              <>
                <h2 className={styles.stepTitle}>ARS 전화 인증하기</h2>
                {arsLoading ? (
                  <p className={styles.arsDesc}>코드를 생성하고 있습니다...</p>
                ) : (
                  <>
                    <p className={styles.arsDesc}>{arsPhone}로 전화를 걸어 ARS 인증을 진행해주세요.</p>
                    <a href={`tel:${arsPhone.replace(/-/g, '')}`} className={styles.arsPhone}>
                      <span className={styles.arsPhoneIcon}>📞</span>
                      {arsPhone}
                    </a>
                    <div className={styles.arsCodeRow}>
                      {arsCode.split('').map((digit, i) => (
                        <span key={i} className={styles.arsCodeDigit}>{digit}</span>
                      ))}
                    </div>
                    <p className={styles.arsTimerText}>
                      {String(Math.floor(arsTimer / 60)).padStart(2, '0')}:{String(arsTimer % 60).padStart(2, '0')}
                    </p>
                    {arsError && <p className={styles.arsError}>{arsError}</p>}
                  </>
                )}
                <div style={{ flex: 1 }} />
                <button
                  type="button"
                  className={`${styles.stepNextBtn} ${styles.stepNextBtnActive}`}
                  onClick={async () => {
                    if (arsId) {
                      try {
                        const result = await apiVerifyArsCode(arsId, arsCode)
                        if (result.verified) {
                          if (arsIntervalRef.current) clearInterval(arsIntervalRef.current)
                          goToStep(null)
                          alert('전화 인증이 완료되었습니다!')
                        } else {
                          setArsError(result.message || '인증에 실패했습니다.')
                        }
                      } catch {
                        setArsError('서버 연결에 실패했습니다.')
                      }
                    } else {
                      if (arsIntervalRef.current) clearInterval(arsIntervalRef.current)
                      goToStep(null)
                      alert('전화 인증이 완료되었습니다!')
                    }
                  }}
                >
                  전화 인증을 완료했어요
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <a href="#faq" className={styles.faqBtn}>FAQ</a>
    </div>
  )
}
