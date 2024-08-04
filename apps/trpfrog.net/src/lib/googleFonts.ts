import {
  Inconsolata,
  M_PLUS_Rounded_1c,
  Noto_Sans_Mono,
  Inter,
  Palanquin_Dark,
} from 'next/font/google'

const mPlusRounded1c = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['100', '400', '700', '800'],
  display: 'swap',
  variable: '--font-m-plus-rounded-1c',
  // To avoid "Failed to find font override values" error,
  // set adjustFontFallback to false
  adjustFontFallback: false,
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
})

const notoSansMono = Noto_Sans_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-mono',
})

const inconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['200'],
  variable: '--font-inconsolata',
})

const palanquinDark = Palanquin_Dark({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-palanquin-dark',
})

// Font loaders must be called and assigned to a const in the module scope
const fonts = [mPlusRounded1c, inter, notoSansMono, inconsolata, palanquinDark]

export const fontVariables = fonts.map(font => font.variable).join(' ')
