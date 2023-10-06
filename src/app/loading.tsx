import { MainWrapper } from '@/components/atoms/MainWrapper'
import { LoadingBlock } from '@/components/molecules/LoadingBlock'

export default function Loading() {
  return (
    <MainWrapper>
      <LoadingBlock isFullHeight={true} />
    </MainWrapper>
  )
}
