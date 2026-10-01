"use client"

import { useEffect } from "react"
import { motion, useSpring, useTransform } from "motion/react"
import "./motion-loading-fill-text-utils/index.css"

function useFillProgress() {
  const progress = useSpring(0)

  useEffect(() => {
    const id = setInterval(() => {
      const next = progress.get() + Math.random() * 0.2
      if (next >= 1) clearInterval(id)
      progress.set(next)
    }, 500)
    return () => clearInterval(id)
  }, [progress])

  return progress
}

export function LoadingFillText() {
  const progress = useFillProgress()
  const clipPath = useTransform(progress, [0, 1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"])

  return (
    <div className="fill-text-container">
      <div className="fill-text-stack">
        <div className="fill-text fill-text-bg" aria-hidden>
          CARGANDO
        </div>
        <motion.div className="fill-text fill-text-fill" style={{ clipPath }}>
          CARGANDO
        </motion.div>
      </div>
    </div>
  )
}

export default LoadingFillText
