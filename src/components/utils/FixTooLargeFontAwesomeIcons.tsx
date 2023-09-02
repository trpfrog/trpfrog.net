'use client'

/**
 * This component is used to prevent from showing too large fontawesome icons.
 */

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config, dom } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

export default function FixTooLargeFontAwesomeIcons() {
  return (
    <style jsx global>{`
      ${dom.css()}
    `}</style>
  )
}
