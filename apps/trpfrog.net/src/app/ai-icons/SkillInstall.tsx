import { Block } from '@/components/molecules/Block'
import { PlainCodeBlock } from '@/components/molecules/CodeBlock/PlainCodeBlock'

const SKILL_SOURCE_URL =
  'https://github.com/trpfrog/trpfrog.net/tree/main/apps/image-generation/skills/tsmami-image'

const INSTALL_PROMPT = [
  '次の URL にあるスキル「tsmami-image」を登録してください。',
  SKILL_SOURCE_URL,
  '',
  'SKILL.md と参照画像 assets/tsmami-reference.png の両方が必要です。',
  '登録できたら、使い方を短く教えてください。',
].join('\n')

export function SkillInstall() {
  return (
    <Block title="つまみさんを描くスキル" h2icon="robot">
      <p>
        このページのアイコンと同じプロンプト・同じ参照画像で、好きなお題のつまみさんを描けるスキルを公開しています。
        ChatGPT などに下のプロンプトを貼り付けると登録できます。
      </p>
      <p>
        使えるのは、スキルと画像生成の両方に対応した LLM サービスだけです。たとえば Claude
        はスキルに対応していますが、画像を生成できないので使えません。
      </p>
      <PlainCodeBlock
        fileName="Prompt"
        copyContent={INSTALL_PROMPT}
        wrap
        padding="normal"
        className="tw:my-3"
      >
        {INSTALL_PROMPT}
      </PlainCodeBlock>
      <p>登録したら「〇〇するつまみさんを描いて」と頼むだけでつまみアイコンを生成できます。</p>
    </Block>
  )
}
