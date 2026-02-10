export const MODEL_LIST = [
  { name: '갤럭시 S25 5G', slug: 'galaxy-s25-5g', image: '/images/models/galaxy-s25-5g.png' },
  { name: '갤럭시 S25+ 5G', slug: 'galaxy-s25-plus-5g', image: '/images/models/galaxy-s25-plus-5g.png' },
  { name: '갤럭시 S25 Ultra 5G', slug: 'galaxy-s25-ultra-5g', image: '/images/models/galaxy-s25-ultra-5g.png' },
  { name: '갤럭시 S25엣지', slug: 'galaxy-s25-edge', image: '/images/models/galaxy-s25-edge.png' },
  { name: '아이폰17', slug: 'iphone-17', image: '/images/models/iphone-17.png' },
  { name: '아이폰 17 Air', slug: 'iphone-17-air', image: '/images/models/iphone-17-air.png' },
  { name: '아이폰 17 PRO', slug: 'iphone-17-pro', image: '/images/models/iphone-17-pro.png' },
  { name: '아이폰 16', slug: 'iphone-16', image: '/images/models/iphone-16.png' },
]

export const getModelBySlug = (slug) => MODEL_LIST.find((m) => m.slug === slug)
export const getModelByName = (name) => MODEL_LIST.find((m) => m.name === name)
export const getSlugByName = (name) => getModelByName(name)?.slug
