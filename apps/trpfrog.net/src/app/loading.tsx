import Skeleton from 'react-loading-skeleton'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { Block } from '@/components/molecules/Block'
import { H2 } from '@/components/wrappers'

function SkeletonPhoto() {
  return (
    <div className="tw-w-[80%] tw-mx-auto">
      <div className="tw-aspect-video">
        <Skeleton height="100%" />
      </div>
      <div className="tw-w-[80%] tw-mx-auto tw-my-2">
        <Skeleton />
      </div>
    </div>
  )
}

function SkeletonH2() {
  return (
    <H2 className="tw-block tw-w-1/2">
      <Skeleton />
    </H2>
  )
}

export default function Loading() {
  return (
    <MainWrapper gridLayout>
      <Block>
        <div className="tw-text-5xl tw-w-1/3">
          <Skeleton />
        </div>
        <p className="tw-mb-0">
          <Skeleton count={3} />
        </p>
      </Block>
      <Block>
        <SkeletonH2 />
        <p>
          <Skeleton count={3} />
        </p>
        <SkeletonPhoto />
        <p>
          <Skeleton count={8} />
        </p>
        <SkeletonH2 />
        <p>
          <Skeleton count={8} />
        </p>
      </Block>
    </MainWrapper>
  )
}
