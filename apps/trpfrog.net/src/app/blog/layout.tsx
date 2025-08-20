import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'つまみログ',
    template: '%s - つまみログ',
  },
}

export default function BlogLayout({ children }: LayoutProps<'/blog'>) {
  return children
}
