import { useState, useEffect, useRef, RefObject } from 'react'

interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number;
}

export function useInView(options: UseInViewOptions = {}): [RefObject<HTMLDivElement | null>, boolean] {
  const { rootMargin = '0px 0px -40px 0px', threshold = 0.1 } = options
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { rootMargin, threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return [ref, isInView]
}
