type Font = { family: string; weight?: number[] }

const fonts: Font[] = [
  { family: 'Comfortaa', weight: [400, 700] },
  { family: 'M PLUS Rounded 1c', weight: [100, 400, 700, 800] },
  { family: 'Roboto' },
  { family: 'Noto Sans JP', weight: [400, 700] },
  { family: 'Noto Sans Mono' },
  { family: 'BIZ UDPGothic', weight: [400, 700] },
]

const fontObjectToString = ({ family, weight }: Font) => {
  let val = 'family=' + family.replace(/ /g, '+')
  if (weight) {
    val += ':wght@' + weight.join(';')
  }
  return val
}

export const getGoogleFontsUrl = () =>
  'https://fonts.googleapis.com/css2?' +
  fonts.map(fontObjectToString).join('&') +
  '&display=swap'

const GoogleFonts = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    <link href={getGoogleFontsUrl()} rel="stylesheet" />
  </>
)

export default GoogleFonts
