import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { RotateButton } from './RotateButton'

describe('RotateButton', () => {
  const cases = [
    { isRotated: true, rotateDirection: 'left' },
    { isRotated: true, rotateDirection: 'right' },
    { isRotated: false, rotateDirection: 'left' },
    { isRotated: false, rotateDirection: 'right' },
  ] as const

  test.each(cases)(
    'snapshot testing (isRotated: $isRotated, rotateDirection: $rotateDirection)',
    ({ isRotated, rotateDirection }) => {
      const view = render(<RotateButton isRotated={isRotated} rotateDirection={rotateDirection} />)
      expect(view.asFragment()).toMatchSnapshot()
    },
  )

  test.each(cases)(
    'onClick should be called when clicked (isRotated: $isRotated, rotateDirection: $rotateDirection)',
    ({ isRotated, rotateDirection }) => {
      const onClick = vi.fn()
      render(
        <RotateButton isRotated={isRotated} rotateDirection={rotateDirection} onClick={onClick} />,
      )
      expect(onClick).toBeCalledTimes(0)
      screen.getByTestId('rotate-button').click()
      expect(onClick).toBeCalledTimes(1)
    },
  )
})
