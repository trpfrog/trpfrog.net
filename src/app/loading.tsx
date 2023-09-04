import MainWrapper from '@/components/MainWrapper'
import LoadingBlock from '@/components/molecules/LoadingBlock'

export default function Loading() {
  return (
    <MainWrapper>
      <LoadingBlock isFullHeight={true} />
    </MainWrapper>
  )
}
