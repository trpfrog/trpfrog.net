import { BLOG_PAGE_NUMBER__1, type BlogPost } from '@trpfrog.net/posts'

/** ストーリーで使う記事。必要なところだけ上書きして使う */
export function createBlogPost(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    title: '段ボール箱の中で考えたこと',
    date: '2026-01-01',
    updated: '2026-01-15',
    tags: ['日記', '技術'],
    description: 'つまみさんが段ボール箱の中で考えたことをまとめました。',
    thumbnail: 'https://res.cloudinary.com/trpfrog/image/upload/icons_gallery/28.png',
    content: ['本文です。'],
    slug: 'example',
    readTime: 300,
    numberOfPhotos: 3,
    currentPage: BLOG_PAGE_NUMBER__1,
    numberOfPages: 1,
    markdown: '本文です。',
    ...overrides,
  }
}
