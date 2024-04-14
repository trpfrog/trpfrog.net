---
title: Next.js 製サイトに日替わりの AI 生成画像を設置してみた
date: '2023-09-08'
tags: 技術
description: >-
  Next.js + Vercel KV + Cloud Functions + HuggingFace.js + OpenAI API で作る日替わり AI
  つまみアイコン
---
## TL;DR

- ちくわぶさんが **text-to-つまみアイコン** の AI [trpfrog-diffusion](https://huggingface.co/Prgckwb/trpfrog-diffusion) を作ってくれたよ (神)
- これを使ってつまみネット (Next.js) のトップページに**日替わりつまみアイコン**を設置したよ
- 一見簡単そうに見えるけど、これを実現するために大量の技術を使ったよ (勉強したよ)
  - **LangChain** (ChatGPT API の wrapper として)
  - **HuggingFace Inference API** (画像生成, HuggingFace.js)
  - **SWR** (クライアントサイドでの data fetching)
  - **Vercel KV** (キャッシュとして使用)
  - **Vercel Edge Functions** (BFF)
  - **Google Cloud Functions** (画像生成API呼び出し)
- その他、頭壊しながらロジック書いたよ、もうやりたくないね

---

あけましておめでとうございます、つまみ ([@TrpFrog](https://twitter.com/TrpFrog)) です。

先日、友人のちくわぶさん ([@Prgckwb](https://twitter.com/Prgckwb)) が**つまみアイコンを自動生成するAI**である **[trpfrog-diffusion](https://huggingface.co/Prgckwb/trpfrog-diffusion)** を作ってくださいました。どうして？

![](/blog/diffusion-component/スクリーンショット_2023-09-07_0-23-32.png "テキストからつまみアイコンを生成できる。サイトにはいろいろな例が載っているので見てみてください")

今回はこれを使って、トップページに**日替わりつまみアイコン**を載せてみました！こちらが、完成品となっております。

<!-- TODO: ここに画像を入れる -->

日替わりと言いつつ、更新頻度が少ないと寂しいので 3 時間に一度くらいのペースで更新しています。
この記事では**日替わりつまみアイコンを支える技術**を紹介したいと思います。思ったより大変だった……

<!-- window break --->

## 仕様

### このサイトについて

このサイトは **Next.js 13.4 (App Router) + TypeScript** で作られています。

### 作るもの

ここでは次のような仕様の「日替わりつまみアイコン」コンポーネントを作ります。

- AI で生成したつまみアイコンを表示する React コンポーネントを作る
- 3時間に一度更新される (日替わりとは)
  - ただし、**AI 関連の API は高い**ので「最後の生成から 3 時間経過したら新しい画像を生成する」という工夫を入れる
- 画像生成のお題はランダムに決定する (人間は介在しない

そこで、この記事では

- **画像生成パート**
- **コンポーネント + BFF 実装パート**

に分けて説明したいと思います。

<!-- window break --->

## ランダム画像生成

### ランダムなプロンプトの生成

人間が介在しない**完全なるランダムな画像**を生成をするために **ChatGPT** `gpt-3.5-turbo` **を使ってプロンプトを生成**をすることにしました。プロンプトとは画像生成 AI に渡すお題のことです。

ChatGPT に「なんかプロンプト作って！」と言っても良いのですが、「なんかプロンプト作って！」だけだといつか同じことを言う可能性があるので、もうちょっと明確にランダム性が欲しいです。そこで、**ランダムに単語を10個取ってきて**「これを使ってプロンプトを作って！」と言ってみることにしました。

<details>
<summary>本当にランダムにならない？</summary>

感覚的に……たぶん temperature とかいじってあげれば同じプロンプトでも同じの出してくれそうだけど、GPT が統計的なモデルである以上ありきたりなことしか言わなさそうという懸念もあります。本当か？

</details>

ということでいい感じにプロンプトを ChatGPT に突っ込みます。
ChatGPT は API を使うと途中までの会話文を指定してあげることができます。
つまり「こんな感じで答えてね」という会話の流れを教えてあげることができます。

(これを few-shot learning といいます。いくつかの例を見せるだけで AI の性能が爆上がりするので普段 AI に嫌われている人は試してみてください)

`````titled-frame
ChatGPT に与えるプロンプト

````conversation
System: 
The user will provide some words. Currently, there is an image-generation AI based on diffusion models named `trpfrog-diffusion`. One of your tasks is to generate a prompt for the AI to create an image based on the provided words.

  - You don't need to use all the words, but you can't use any additional words.
  - You must avoid using sensitive (e.g. sexual, violent) words. This is a crucial rule.
  - The prompt should begin with "a photo of" and include "trpfrog". ("trpfrog" is the subject of the photo)
  - You must not create a sensitive prompt. This is also a crucial rule.

Your task is to complete the following tasks in order and provide the answer in JSON format：<br>
  "prompt"： Generate a prompt for the AI to create an image based on the provided words in English.<br>
  "translated"： Translate this prompt into simple Japanese. ("trpfrog" translates to "つまみさん" in Japanese and you should attempt to translate English-specific words into Japanese using カタカナ.)
 
---

<small>

**日本語訳 by GPT-4** <br>

ユーザーがいくつかの言葉を提供します。現在、`trpfrog-diffusion`という名前の拡散モデルに基づいた画像生成AIが存在します。あなたのタスクの一つは、提供された言葉に基づいてAIが画像を生成するためのプロンプトを生成することです。

  - すべての単語を使用する必要はありませんが、追加の単語を使用することはできません。
  - センシティブな（例：性的、暴力的な）単語の使用は避けてください。これは重要なルールです。
  - プロンプトは"a photo of"で始まり、"trpfrog"を含むべきです。("trpfrog"は画像の被写体です)
  - センシティブなプロンプトを作成してはなりません。これも重要なルールです。
  
あなたのタスクは、以下のタスクを順序良く完了し、答えをJSON形式で提供することです：<br>
  "prompt"： 提供された英語の言葉に基づいてAIが画像を生成するためのプロンプトを生成します。<br>
  "translated"： このプロンプトをシンプルな日本語に翻訳します。("trpfrog"は日本語で"つまみさん"に翻訳します。また、英語特有の単語はカタカナを使用して日本語に翻訳しましょう。)

</small>

User:
(単語1, 単語2, 単語3, ..., 単語8, 単語9, running をシャッフルしたもの)

AI: `{ "prompt"： "a photo of running trpfrog", "translated"： "走るつまみさんの画像" }`

User:
(単語1, 単語2, 単語3, ..., 単語8, hat, sword をシャッフルしたもの)

AI: `{ "prompt"： "a photo of trpfrog with a hat and a sword and a shield", "translated"： "帽子と剣と盾を持ったつまみさんの画像" }`

User:
単語1, 単語2, 単語3, ..., 単語8, 単語9, 単語10
````

`````

これを AI ライブラリである LangChain を使ってこんな感じで渡してあげます。

```ts
const chat = new ChatOpenAI({ temperature: 0.3 })
const response = await chat.call([
  new SystemMessage('The user will provide...'),
  new HumanMessage(
    getShuffledArray([...sourceWords.slice(1), 'running']).join(', '),
  ),
  new AIMessage(JSON.stringify({
    prompt: 'a photo of running trpfrog',
    translated: '走るつまみさんの画像',
  })),
  new HumanMessage(
    getShuffledArray([...sourceWords.slice(2), 'hat', 'sword']).join(', '),
  ),
  new AIMessage(JSON.stringify({
    prompt: 'a photo of trpfrog with a hat and a sword and a shield',
    translated: '帽子と剣と盾を持ったつまみさんの画像',
  })),
  new HumanMessage(sourceWords.join(', ')),
])
const reply = response.content
```


これを AI に与えて得られる JSON をパースして、プロンプトとします。このとき、


```ts
const AIResponseSchema = z.object({
  prompt: z.string(),
  translated: z.string(),
})
return AIResponseSchema.parse(JSON.parse(reply))
```

のように **AI の応答を zod でバリデーション**しています。
AI は確率的に振る舞うので、必ずしも JSON を吐かないことに注意が必要です。(とはいえ GPT-3.5 は十分に賢いので、few-shot learning だけでほぼ 100% JSON を吐いてくれます。ありがたいですね)

ちなみに先ほどから「ランダムな単語」と言っていますが、これは [Random word API](https://random-word-api.herokuapp.com/home) から取っています。`/word?number=10` で英単語をランダムに10個取れます。ありがとうございます。

### 画像を生成する

プロンプトさえできてしまえば画像は簡単に生成できます。

```
npm i @huggingface/inference
```

で導入できる HuggingFace のライブラリを使います。HuggingFace は多数の AI モデルをホストしているサービスです。AI 界の GitHub 的な言われ方をすることもあります。

HuggingFace では推論をやってくれる API (Inference API) があり、`@huggingface/inference` はそのラッパーライブラリとなっています。API で推論できることの嬉しい点としては

- 簡単
- デカいメモリが必要ない (重要)

ことがあげられます。通常、AI の推論には巨大な RAM か VRAM が必要になる上、モデル自体のサイズも大きいのでそれなりのディスク容量が必要になります。これをクラウドでやると莫大なお金がかかってしまいます。これを API にまとめて向こうで推論をやってくれる HuggingFace、感謝……


ということで、次のような感じで推論を行います。

```ts
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGINGFACE_TOKEN)

export async function generateTrpFrogImage(prompt: string) {
  const responseBlob = await hf.textToImage({
    model: 'Prgckwb/trpfrog-diffusion',
    inputs: prompt,
  })
  const arrayBuffer = await responseBlob.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')
```

雑にいえば `hf.textToImage` に**モデル名とプロンプトを渡せば終了**です。簡単！
モデル名にはちくわぶさんの作ってくださった `Prgckwb/trpfrog-diffusion` を指定します。

`hf.textToImage` からは Blob が落ちてくるので、これを扱いやすくするために base64 に変換しています。

ところで、HuggingFace ではセンシティブな画像が生成されてしまったとき、エラーを吐いたり再生成したりすることなく、**無言で真っ黒な画像を返す**という最悪な仕様があります。

真っ黒な画像の base64 には `ooooAKKKKACiiigA` が繰り返し出現するので、これを利用してセンシティブチェックを行います。(これ本当にどうにかならないんですかね)

```ts
  const invalidImagePattern = /(ooooAKKKKACiiigA){10,}/
  return {
    base64,
    success: !invalidImagePattern.test(base64),
  }
}
```

これで、ランダムな画像の生成ができるようになりました！

<!-- window break --->


## コンポーネント + BFF の実装

さて、一番困ったパートです。

BFF は Backend for Frontend の略で、(僕もよくわかってないのですが) バックエンドほどでもないけど、フロントに分類するにはバックエンドすぎる、フロントエンドのための薄いバックエンド的な意味です。 API Routes とか。

**3時間おきに更新する** を実現するためにまず、Server Component の利用を考えてみました。

### Server Component によるサーバサイドの fetch









































