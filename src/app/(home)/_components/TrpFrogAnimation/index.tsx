'use client'

import React from 'react'

import { Tooltip } from 'react-tooltip'

import AnglePicker from '@/components/atoms/AnglePicker'

import styles from './index.module.scss'

type Props = {
  children: React.ReactNode
  id?: string
}

export default function TrpFrogAnimation({ children, id }: Props) {
  const ref = React.useRef<HTMLDivElement>(null)
  return (
    <>
      <div id={styles.animation} ref={ref}>
        <div id={styles.trpfrog_name}>Welcome!</div>
        <div id={styles.lines} />
        <div id={styles.trpfrog_image} />
        <div>
          <div className={styles.angle_picker_wrapper}>
            <AnglePicker
              size={70}
              className={styles.angle_picker}
              onAngleChange={degree => {
                ref.current?.style.setProperty(
                  '--trpfrog-animation-start-degree',
                  degree + 'deg',
                )
              }}
            />
            <div
              className={styles.angle_picker_button}
              data-tooltip-id="about-angle-picker"
            >
              ？
            </div>
            <Tooltip
              id="about-angle-picker"
              place="right"
              style={{ textAlign: 'left', maxWidth: 'min(50vw, 500px)' }}
            >
              <p style={{ margin: 0 }}>
                <span style={{ display: 'inline-block' }}>
                  「集中線のアニメーションのせいで端末がアチアチになる」
                </span>
                <span style={{ display: 'inline-block' }}>
                  との苦情を多数いただいたため、人力アニメーションにしました。
                </span>
              </p>
              <p style={{ margin: 0 }}>
                <span style={{ display: 'inline-block' }}>
                  アニメーションしたい方は
                </span>
                <span style={{ display: 'inline-block' }}>
                  頑張って左の回すやつをくるくるしてください。
                </span>
              </p>
            </Tooltip>
          </div>
        </div>
      </div>
      <div id={id}>{children}</div>
    </>
  )
}
