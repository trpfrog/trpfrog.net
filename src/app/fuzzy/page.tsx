import { InlineLink } from '@/components/atoms/InlineLink'
import { Block } from '@/components/molecules/Block'
import { Li, UnorderedList } from '@/components/wrappers'

import { SearchBox } from './SearchBox'
import styles from './style.module.scss'

export default function Fuzzy() {
  return (
    <>
      <Block style={{ textAlign: 'center' }} ribbonText={'BETA'}>
        <h2 className={styles.title}>
          trpfrog.net/<b style={{ fontWeight: 800 }}>fuzzy</b>
        </h2>
        <p>あいまい URL リダイレクト</p>
      </Block>

      <Block style={{ textAlign: 'center' }}>
        <SearchBox />
      </Block>

      <Block title="入力例" h2icon="trpfrog">
        <UnorderedList>
          <Li>
            enoshima {'=> '}
            <InlineLink href={'https://trpfrog.net/blog/enoshima-walk'}>
              https://trpfrog.net/blog/enoshima-walk
            </InlineLink>
          </Li>
          <Li>
            balllloooon {'=> '}
            <InlineLink href={'https://trpfrog.net/balloon'}>
              https://trpfrog.net/balloon
            </InlineLink>
          </Li>
          <Li>
            山登り {'=> '}
            <InlineLink href={'https://trpfrog.net/blog/takao-full-search'}>
              https://trpfrog.net/blog/takao-full-search
            </InlineLink>
          </Li>
        </UnorderedList>
      </Block>

      <Block title="仕組み" h2icon="robot">
        <p>
          OpenAI API の Chat でごにょごにょします。
          単純な編集距離じゃないので日本語を突っ込んでも機能します。(すごい！)
        </p>
        <p>
          API 料金が高いので飽きたらやめます。(1 時間に 10
          リクエストまでの単純な rate limit があります)
        </p>
      </Block>
    </>
  )
}
