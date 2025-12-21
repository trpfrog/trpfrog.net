import { createURL, validateUnknown } from '@trpfrog.net/utils'
import { Window } from 'happy-dom'
import * as v from 'valibot'

export type FetchedTweet = {
  id: string
  date: string
  tweet: string
  name: string
  userid: string
  image?: string
  image2?: string
  image3?: string
  image4?: string
}

function formatDateToDisplay(date: string): string {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    throw new Error('Failed to parse tweet date')
  }
  const year = String(parsed.getFullYear())
  const month = String(parsed.getMonth() + 1).padStart(2, '0')
  const day = String(parsed.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function beautifyTweet(tweetHTML: string): string {
  const window = new Window()
  const document = window.document
  document.body.innerHTML = tweetHTML

  const anchorTags = document.querySelectorAll('a')
  for (const anchorTag of anchorTags) {
    if (anchorTag.textContent?.startsWith('pic.twitter.com')) {
      anchorTag.outerHTML = ''
    } else if (anchorTag.textContent?.startsWith('#')) {
      anchorTag.outerHTML = ' ' + anchorTag.textContent
    } else {
      anchorTag.outerHTML = anchorTag.textContent ?? ''
    }
  }

  return document.body.innerHTML?.trim() ?? ''
}

function countImages(tweetHTML: string): number {
  return (tweetHTML.match(/pic.twitter.com/g) ?? []).length
}

function preprocessURL(url: string): string {
  const trimmed = url.split('?')[0].trim()
  if (!trimmed) {
    throw new Error('Invalid URL')
  }

  if (trimmed.match(/^\d+$/)) {
    return `https://twitter.com/trpfrog/status/${trimmed}`
  }

  if (!trimmed.startsWith('https://twitter.com') && !trimmed.startsWith('https://x.com')) {
    throw new Error('Invalid URL')
  }

  return trimmed
}

export async function fetchTweet(tweetUrl: string): Promise<FetchedTweet> {
  const normalizedUrl = preprocessURL(tweetUrl)

  const FetchedTweetSchema = v.object({
    url: v.string(),
    author_name: v.string(),
    html: v.string(),
    author_url: v.string(),
  })

  const endpoint = createURL('/oembed', 'https://publish.twitter.com', {
    dnt: 'true',
    omit_script: 'true',
    url: normalizedUrl,
  })

  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error(`Failed to fetch tweet (status: ${response.status})`)
  }
  const rawContent = await response.json()
  const content = validateUnknown(FetchedTweetSchema, rawContent)

  const window = new Window()
  const document = window.document
  document.body.innerHTML = content.html

  const links = document.querySelectorAll('a')
  const dateElement = links.item(links.length - 1)
  if (!dateElement) {
    throw new Error('Failed to parse tweet date')
  }

  const rawTweet = document.querySelector('p')?.innerHTML ?? ''
  const images = countImages(rawTweet)
  const imagePrefix = 'https://res.cloudinary.com/trpfrog'

  return {
    id: content.url.split('/').pop() ?? '',
    date: formatDateToDisplay(dateElement.textContent ?? ''),
    tweet: beautifyTweet(rawTweet),
    name: content.author_name,
    userid: content.author_url.split('/').pop() ?? '',
    image: images >= 1 ? imagePrefix : undefined,
    image2: images >= 2 ? imagePrefix : undefined,
    image3: images >= 3 ? imagePrefix : undefined,
    image4: images >= 4 ? imagePrefix : undefined,
  }
}

export function createTweetBlock(result: FetchedTweet): string {
  const isTrpFrog = result.userid === 'TrpFrog'

  const createLine = (key: keyof typeof result) => {
    const value = result[key]
    return value ? `${String(key)}: ${value as string}` : undefined
  }

  return [
    '```twitter-archived',
    createLine('id'),
    !isTrpFrog && createLine('name'),
    !isTrpFrog && createLine('userid'),
    createLine('date'),
    createLine('tweet'),
    createLine('image'),
    createLine('image2'),
    createLine('image3'),
    createLine('image4'),
    '```',
  ]
    .filter(Boolean)
    .join('\n')
}

export async function createTweetBlockFromUrl(url: string): Promise<string> {
  const result = await fetchTweet(url)
  return createTweetBlock(result)
}
