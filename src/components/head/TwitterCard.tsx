import { SITE_NAME, TWITTER_ID } from '@/lib/constants'

type Props = {
  title?: string
  description?: string
  url: string
  image?: string
}

export const TwitterCard = ({
  title = SITE_NAME,
  description = 'さかなになりたいね',
  url,
  image = 'https://res.cloudinary.com/trpfrog/TwitterCard',
}: Props) => {
  if (title != SITE_NAME) {
    title = title + ' - ' + SITE_NAME
  }
  return (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_ID} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </>
  )
}
