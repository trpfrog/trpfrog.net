import type { BlogPost } from '@trpfrog.net/posts'

import { SITE_PROFILE } from './site-profile'

const PERSON_ID = `${SITE_PROFILE.url}/#person`
const WEBSITE_ID = `${SITE_PROFILE.url}/#website`

function person() {
  const { author } = SITE_PROFILE
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: author.name,
    alternateName: author.alternateName,
    jobTitle: author.jobTitle,
    description: author.description,
    email: `mailto:${author.email}`,
    url: SITE_PROFILE.url,
    sameAs: author.sameAs,
  }
}

export function buildSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_PROFILE.name,
        url: SITE_PROFILE.url,
        description: SITE_PROFILE.description,
        inLanguage: SITE_PROFILE.language,
        author: { '@id': PERSON_ID },
      },
      person(),
    ],
  }
}

export function buildBlogPostingJsonLd(post: BlogPost) {
  const url = `${SITE_PROFILE.url}/blog/${encodeURIComponent(post.slug)}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: SITE_PROFILE.language,
    url,
    mainEntityOfPage: url,
    image: `${url}/og-image`,
    keywords: post.tags,
    author: person(),
    isPartOf: { '@id': WEBSITE_ID },
  }
}
