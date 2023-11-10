---
title: Satori に Google Fonts を使う
date: '2023-10-04'
updated: '2023-10-27'
tags: 技術
description: >-
  HTML/CSS から SVG を生成するライブラリ vercel/satori に Google Fonts を使う方法の備忘録 (Next.js の動的
  OGP 生成に使う)
---
## TL;DR

- Satori にはカスタムフォントを使えるようにする機能がある
- Google Fonts の [Developer API](https://developers.google.com/fonts/docs/developer_api) を使うとフォントファイルの置かれている URL が入手できる
  - API キーが必要、API の rate limit は無制限
- これを fetch して Buffer を Satori に与えれば Google Fonts が使えるようになる
- サンプルコード: https://gist.github.com/TrpFrog/70c28ad13ccb951337b81e55054b70f8

## モチベーションと方針

このサイトでは OGP 生成に Next.js の `ImageResponse` を使っています。例えばこの記事の OGP 画像は https://trpfrog.net/blog/google-fonts-on-satori/og-image にあります。

![](/blog/google-fonts-on-satori/og-image?w=1200&h=630 "生成例")

これらは記事ごとに手作業で作成しているのではなく、**自動的に生成**しているものです。これを実現するために Next.js の `ImageResponse` を使用しています。

例えば次のようなイメージです。(実際はもう少し複雑な処理をしていますが)

```src/app/blog/[slug]/og-image/route.tsx
import { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

type Context = { params: { slug: string } }

export async function GET(req: NextRequest, context: Context) {
  const slug = context.params.slug
  const articleEndpoint = 'https://trpfrog.net/api/blog/posts/' + slug
  const { title, thumbnail } = await fetch(articleEndpoint).then(res => res.json())

  return new ImageResponse(
    (
      <div style={{ display: 'flex', backgroundImage: `url("${thumbnail}")` }}>
        <h1>つまみログ</h1>
        <div>
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
```

<small>

**2023/10/27 追記:**
Next.js 14 で `ImageResponse` を `next/og` から import するようになったのでこちらのコードも変更しました。

</small>


OGP 画像をこだわって作ると、フォントにもこだわりたい気持ちが出てきます。
Google Fonts が使えると嬉しいです。

Next.js の `ImageResponse` で内部的に使われているであろう JSX-to-SVG のライブラリ [vercel/satori](https://github.com/vercel/satori) には**カスタムフォントを使用する機能**があります。しかし、デフォルトで Google Fonts からフォントを読み込む機能はありません。

vercel/satori の issues には Google Fonts からフォントファイルをダウンロードすることで実現している方もいましたが、個人的にはリポジトリにフォントはあまり設置したくない気持ちがあります。(デカいので)

そこで、**Google Fonts の Developer API** を使います。Developer API では**フォントの配布先リンクを取得**できます。これを使って Google Fonts からフォントデータをダウンロードし、Satori に渡してこの問題を解決したいと思います。

## 実装

まず、以下のようにしてフォント情報を fetch します。

```js
const endpoint = new URL('https://www.googleapis.com/webfonts/v1/webfonts');
endpoint.searchParams.set('family', 'M PLUS Rounded 1c');
endpoint.searchParams.set('key', process.env.GOOGLE_FONTS_API_KEY);

const info = await fetch(endpoint).then(res => res.json());
```

`'M PLUS Rounded 1c'` の部分は好きなフォント名に変えてください。
API キーは [Developer API のページ](https://developers.google.com/fonts/docs/developer_api) の「Get a Key」から入手できます。(もしかしたら Google Cloud への登録が必要かも？)

<small>

API キーが求められているので rate limit が設けられていると思ったのですが、どうやら**無制限**のようです。気にせず使ってよさそうです。(参考: https://github.com/google/fonts/issues/4589)
	
</small>

`info` には次のような JSON が入っているはずです。

```json
{
  "kind": "webfonts#webfontList",
  "items": [
    {
      "family": "M PLUS Rounded 1c",
      "variants": ["100", "300", "regular", "500", "700", "800", "900"],
      "subsets": ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "hebrew", "japanese", "latin", "latin-ext", "vietnamese"],
      "version": "v15",
      "lastModified": "2022-09-27",
      "files": {
        "100": "http://fonts.gstatic.com/s/mplusrounded1c/v15/SAMPLE.ttf",
        "300": "http://fonts.gstatic.com/s/mplusrounded1c/v15/SAMPLE.ttf",
        "regular": "http://fonts.gstatic.com/s/mplusrounded1c/v15/SAMPLE.ttf",
        "500": "http://fonts.gstatic.com/s/mplusrounded1c/v15/SAMPLE.ttf",
        "700": "http://fonts.gstatic.com/s/mplusrounded1c/v15/SAMPLE.ttf",
        "800": "http://fonts.gstatic.com/s/mplusrounded1c/v15/SAMPLE.ttf",
        "900": "http://fonts.gstatic.com/s/mplusrounded1c/v15/SAMPLE.ttf"
      },
      "category": "sans-serif",
      "kind": "webfonts#webfont",
      "menu": "http://fonts.gstatic.com/s/mplusrounded1c/v15/SAMPLE.ttf"
    }
  ]
}
```

ここから使いたい weight のフォントだけを拾ってきて fetch します。

```js
const fontResponse = await fetch(fontInfo.items[0].files['800']);
const fontBuffer = await fontResponse.arrayBuffer();
```

最後に fetch したフォントデータの入っている ArrayBuffer を Satori に渡して SVG を生成します。(Next.js の `ImageResponse` を使う場合は `await satori(...)` を `new ImageResponse(...)` に読み替えてください)

```jsx
const svg = await satori(
  // SVG の見た目の定義
  <div style={{
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center', 
    background: 'lightgray',
    width: '100%',
    height: '100%',
    fontSize: 32,
  }}>
    Hello, Google Fonts!
  </div>,

  // その他の設定
  {
    width: 600,
    height: 400,
    fonts: [
      {
        name: 'M PLUS Rounded 1c',
        data: fontBuffer, // ここに渡す
      },
    ],
  },
)
```

生成した SVG は `fs.writeFileSync` 等でファイルに出力すると確認できます。

```js
fs.writeFileSync('output.svg', svg);
```

![](/blog/google-fonts-on-satori/スクリーンショット_2023-10-03_22-46-44?w=1360&h=1042 "Google Fonts を使って生成できている")

確かに Google Fonts を使って生成できていることが確認できました。

## 注意点

Next.js でやる場合、フォントデータはデカいのでキャッシュされないことがあります。(2MB を超えるので)

その場合、以下のようにすると warning を消すことができます。

```ts
const fontResponse = await fetch(fontURL, { cache: 'no-cache' });
```

## サンプルコード

https://gist.github.com/TrpFrog/70c28ad13ccb951337b81e55054b70f8
