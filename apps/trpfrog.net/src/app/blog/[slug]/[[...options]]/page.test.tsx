import { BlogPost } from '@trpfrog.net/posts'
import { expect, it, describe, vi, afterAll } from 'vitest'

describe('generateStaticParams', () => {
  afterAll(() => {
    vi.restoreAllMocks()
  })

  describe('generates static params based on the number of pages in a blog post', () => {
    const cases: {
      slug: string
      numberOfPages: number
      expected: { options: string[] | undefined }[]
    }[] = [
      {
        slug: '3-pages',
        numberOfPages: 3,
        expected: [
          { options: ['1'] },
          { options: ['2'] },
          { options: ['3'] },
          { options: ['all'] },
          { options: undefined },
        ],
      },
      {
        slug: 'only-1-page',
        numberOfPages: 1,
        expected: [{ options: ['1'] }, { options: ['all'] }, { options: undefined }],
      },
    ]

    it.each(cases)('$slug ($numberOfPages pages)', async ({ slug, numberOfPages, expected }) => {
      vi.resetModules()
      const rpc = await import('../../rpc')
      const spy = vi
        .spyOn(rpc, 'fetchPost')
        .mockImplementationOnce(() => Promise.resolve({ numberOfPages } as BlogPost))

      const { generateStaticParams } = await import('./page')
      const params = await generateStaticParams({
        params: { slug },
      })

      expect(spy).toHaveBeenCalledWith(slug)
      expect(params).toEqual(expected)
    })
  })
})
