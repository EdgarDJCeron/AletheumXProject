"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const WORDS = ["Confianza", "Transparencia", "Reputación", "Honestidad"]

export function WordRotator() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="relative inline-block h-[1.25em] overflow-hidden align-bottom min-w-[600px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ y: "80%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-80%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="absolute left-0 top-0 block w-full whitespace-nowrap pt-[0.1em]"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
