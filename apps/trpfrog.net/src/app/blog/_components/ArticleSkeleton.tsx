import Skeleton from 'react-loading-skeleton'

import { Block } from '@/components/molecules/Block'

export function ArticleSkeleton() {
  return (
    <Block>
      <Skeleton inline className="tw:my-4 tw:text-4xl tw:w-2/3!" />
      <Skeleton count={5} containerClassName="tw:my-4 tw:block" />
      <Skeleton count={4} containerClassName="tw:my-4 tw:block" />
      <Skeleton count={5} containerClassName="tw:my-4 tw:block" />
      <Skeleton count={3} containerClassName="tw:my-4 tw:block" />
      <Skeleton count={4} containerClassName="tw:my-4 tw:block" />
    </Block>
  )
}
