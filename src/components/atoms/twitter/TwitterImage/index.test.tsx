import { render, screen } from '@testing-library/react'

import { TwitterImage } from '.'

export const images = [
  {
    src: 'https://res.cloudinary.com/trpfrog/blog/omiya-walk/9BC93754-1D27-4B38-B66F-50D4BCB698E8_1_105_c.jpg',
    alt: '1st image',
  },
  {
    src: 'https://res.cloudinary.com/trpfrog/blog/omiya-walk/FO-xf2TVUAALKZA.jpg',
    alt: '2nd image',
  },
  {
    src: 'https://res.cloudinary.com/trpfrog/blog/omiya-walk/IMG_0803.jpg',
    alt: '3rd image',
  },
  {
    src: 'https://res.cloudinary.com/trpfrog/blog/omiya-walk/DSC_1264.jpg',
    alt: '4th image',
  },
] as const

describe('TwitterImage', () => {
  test('snapshot test', () => {
    const view = render(<TwitterImage images={[images[0]]} />)
    expect(view.asFragment()).toMatchSnapshot()
  })

  test.each([
    { images: [images[0]] },
    { images: [images[0], images[1]] },
    { images: [images[0], images[1], images[2]] },
    { images: [images[0], images[1], images[2], images[3]] },
  ])('should render correctly', ({ images }) => {
    render(<TwitterImage images={images} />)
    for (const { alt } of images) {
      expect(screen.getByAltText(alt)).toBeInTheDocument()
    }
  })
})
