'use client'

import * as React from 'react'
import { useState } from 'react'

import { faA, faB } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '@/app/(home)/_components/AboutMe/index.module.scss'

export function KCommandBox({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const answer = '↑↑↓↓←→←→BA' // ソースまで辿り着くような人間はどうせこれも知ってるのでソース直書きで良い

  const figures = {
    '↑': <FontAwesomeIcon icon={faPlay} rotation={270} />,
    '↓': <FontAwesomeIcon icon={faPlay} rotation={90} />,
    '←': <FontAwesomeIcon icon={faPlay} rotation={180} />,
    '→': <FontAwesomeIcon icon={faPlay} />,
    A: <FontAwesomeIcon icon={faA} />,
    B: <FontAwesomeIcon icon={faB} />,
  } as const

  return isUnlocked ? (
    <>{children}</>
  ) : (
    <>
      <div className={styles.command_keyboard}>
        {(['↑', '↓', '←', '→', 'A', 'B'] as (keyof typeof figures)[]).map(e => (
          <button
            key={e}
            onClick={() => {
              const newInput = input + e
              if (newInput === answer) {
                setIsUnlocked(true)
              }
              if (newInput.length > answer.length) {
                setInput('')
              } else {
                setInput(newInput)
              }
            }}
          >
            {figures[e]}
          </button>
        ))}
      </div>
      <div>{input.replaceAll(/./g, '●')}</div>
    </>
  )
}
