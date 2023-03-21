import {BlogPost} from "./load";

export type ErrorablePost = BlogPost & {
  isError: boolean
}

const errorArticle = {
  isError: true,
  title: 'ERROR!',
  slug: 'slug',
  date: '2000-10-17',
  updated: '2020-10-17',
  tags: 'test',
  isAll: false,
  readTime: 100,
  currentPage: 1,
  numberOfPages: 1,
  content: ['Error has occurred']
} satisfies ErrorablePost


export const createErrorArticle = (errTitle: string): ErrorablePost => {
  let ret = {...errorArticle}
  ret.title = 'ERR: ' + errTitle
  return ret
}

