"use client"

import { useEffect, useRef } from "react"

export default function Reveal({
  children,
  className = "",
  delay = 0,
  once = true,
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
}) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-revealed")
          if (once) observer.unobserve(element)
          return
        }

        if (!once) {
          element.classList.remove("is-revealed")
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  )
}
