import MainWrapper from "../components/common/server/MainWrapper";
import LoadingBlock from "../components/LoadingBlock";

export default function Loading() {
  return (
    <MainWrapper>
      <LoadingBlock isFullHeight={true}/>
    </MainWrapper>
  )
}
