import { render, screen } from '@testing-library/react'

import { LOREM_IPSUM } from '@/lib/constants'

import { TwitterArchived } from '.'

describe('TwitterArchived', () => {
  const props = {
    author: '折川かさな',
    screenName: 'TrpFrog',
    tweet: '@TrpFrog ごきげんよう！ 今日は良い天気ですね。 #good_morning',
    id: '1353937432136228864',
    date: '2000-10-17',
  }

  test('snapshot test', () => {
    const view = render(<TwitterArchived {...props} />)
    expect(view.asFragment()).toMatchSnapshot()
  })

  test('should render correctly', () => {
    render(<TwitterArchived {...props} tweet={LOREM_IPSUM} />)
    expect(screen.getByText(LOREM_IPSUM)).toBeInTheDocument()
  })
})
