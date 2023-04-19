import styles from '../styles/common/Loading.module.scss'
import MainWrapper from "../components/common/server/MainWrapper";
import Block from "../components/Block";

export default function Loading() {
  return (
    <MainWrapper>
      <Block className={styles.block}>
        <div className={styles.wrapper}>
          <span className={styles.text}>
            <span>L</span>
            <span>o</span>
            <span>a</span>
            <span>d</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      </Block>
    </MainWrapper>
  )
}
