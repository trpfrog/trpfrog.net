import { act, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vite-plus/test'

import { YouTube } from './YouTube'

describe('YouTube', () => {
  it('shows the thumbnail behind a play button until pressed', () => {
    render(<YouTube videoId="VO64Ih8c1yU" />)
    const button = screen.getByRole('button', { name: 'YouTube 動画を再生' })
    expect(button).toHaveStyle({
      backgroundImage: 'url(https://i.ytimg.com/vi/VO64Ih8c1yU/hqdefault.jpg)',
    })
    expect(screen.queryByTitle('YouTube 動画')).toBeNull()
  })

  it('loads the player with its params and autoplay once pressed', async () => {
    render(<YouTube videoId="VO64Ih8c1yU" params="start=30" />)
    await act(async () => {
      screen.getByRole('button', { name: 'YouTube 動画を再生' }).click()
    })
    expect(screen.getByTitle('YouTube 動画')).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/VO64Ih8c1yU?start=30&autoplay=1',
    )
  })
})
