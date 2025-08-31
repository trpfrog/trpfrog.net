import dedent from 'ts-dedent'

import { AssetsRepo } from '../domain/repos/assets-repo'
import { TextToImage } from '../domain/services/text-to-image'
import { base64ArrayBuffer } from '../lib/base64'

export function generateImageUseCase(deps: { textToImage: TextToImage; assetsRepo: AssetsRepo }) {
  return async (prompt: string) => {
    const tsmamiImagePrompt = dedent`
        このキャラクターは「つまみ」「つまみさん」「tsmami」と呼ばれています。

        ## つまみさんの特徴

        - 特徴 箱に緑色の球体が入っています。
        - 箱: 必ず箱に入っています。
        - 箱の種類: ダンボール箱であることが多いですが、別の種類の箱であることもあります。
        - 表情: 画像のようにニュートラルな表情をしていることが多いです。
        - 色: つまみさんの球体の色は緑色であることが多いですが、別の色になることもあります。
        - 手足: 基本的に**緑色の本体に手足は存在しません**。
        - 手の表現:
          - 避ける方法がある場合は避けてください。
          - 箱のヒダ部分自体を手として表現することを優先して検討してください。**箱から手を生やしてはいけません**。
          - それでも不十分な場合は、**最後の手段として**本体と同じ色で控えめに表現してください。手は箱との境目付近から生やしてください。
        - 足の表現:
          - **足を描画してはいけません**。
          - 表現の工夫で足を描かなくて良い方法がある場合は、そのようにしてください。
          - どうしても表現する必要がある場合は障害物で隠す、画角外にして隠す等をしてください。

        ## ルール

        - 今から画像生成をしてもらいます。
        - 画像は必ず生成してください。Hallucination しないでください。
        - 画風はタスクにあった内容を自動で選択してください。この際、**キャラクターの質感も画風に合うようにしてください**。
        - 生成する画像 aspect ratio は 1:1 です。

        ## タスク

        Generate Image:
        ${prompt}
      `

    try {
      const tsmamiImageBase64 = await deps.assetsRepo
        .fetch('/tsmami.png')
        .then(res => res.arrayBuffer())
        .then(ab => base64ArrayBuffer(ab))

      return await deps.textToImage(tsmamiImagePrompt, [tsmamiImageBase64])
    } catch (e) {
      console.error(e)
      throw new Error('Failed to generate image')
    }
  }
}
