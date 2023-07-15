type BlogPost = {
  title: string
  slug: string
  date: string
  updated: string
  tags: string
  description?: string
  thumbnail?: string
  readTime: number
  numberOfPhotos?: number
  held?: string
  previewContentId?: string
  isAll: boolean
  currentPage: number
  numberOfPages: number
  content: string[]
}

export default BlogPost
