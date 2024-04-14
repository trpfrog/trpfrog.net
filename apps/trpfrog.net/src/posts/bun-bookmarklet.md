---
title: Bun + TypeScript でブックマークレットの開発体験を高める
date: 2024-03-02
tags:
  - 技術

description: Bun + TypeScript + GitHub Pages で開発体験もユーザ体験も良いブックマークレットを作ろう

---

こんにちは、つまみ ([@TrpFrog](https://twitter.com/trpfrog)) です。

先日、大学のシステムで使えるブックマークレットを作ってみました。

```link-embed
https://github.com/trpfrog/uec-fulfilled
```

大学の学務情報システムから確認できる単位取得状況の表に「残り単位数」のカラムを追加する簡単なブックマークレットです。読者全員が電通大生というわけでもないので、誰でも試せるデモページも用意してみました。

```link-embed
https://trpfrog.github.io/uec-fulfilled/
```

これを使うと頑張って「単位足りてるかな……」と単位修得状況の表の数字を目で追いかけずとも、**一発で**単位が足りているか分かり便利です。たぶん月曜日 (2024-03-04) に卒業予定者以外の人の成績発表があると思うので是非使ってみてください！

---

本題に入ります。

ブックマークレットというと生の JavaScript を書くイメージがあると思いますが、今回私はこのブックマークレットを**ファイル分割した TypeScript のプロジェクト**として作りました。しかも **linter/formatter も入れています**。かなり快適に開発ができたので、やったことを紹介したいと思います。

## tl;dr

- ファイル分割した TypeScript のプロジェクトもバンドルすればブックマークレットに使える
  - `Bun.build` を使うと TS のプロジェクトを簡単にバンドルできる
- 開発サーバを立てると、スムーズにブックマークレットの開発ができる
  - 開発サーバは `Bun.serve` で立てられる
  - アクセスごとにバンドルすると開発体験が良い
- GitHub Pages にスクリプトを上げると常に最新のブックマークレットを使ってもらえる

## ブックマークレットとバンドラ

ブックマークレットはご存知の通り、便利スクリプトを「リンク」としてブックマークに置いておけるすごいやつです。
例えば、

```no-header:js
javascript:(function(){ alert('Hello, world!') })()
```

を href に入れた「<a href="javascript:(function(){ alert('Hello, world!') })()">このリンク</a>」をブックマークバーにドラッグ&ドロップしてクリックすれば、どこでも `Hello, world!` のアラートを出すことができます。

ブックマークレットの大変なところは「リンク」としてスクリプトを保管する制約上、実行するコードのすべてを `javascript:(function(){ ... }())` の中に書かなくてはいけないところです。当然 TypeScript も使えなければ、複数のファイルに分割することもできません。**大規模なブックマークレットを作る場合**、かなり開発体験が悪いです。これを解決するためにバンドラを使います。

**バンドラ**は大きな TS/JS プロジェクトをバンドル ── ライブラリを含め、プロジェクト全体を全部1ファイルに固めてしまう処理 ── をしてくれる人です。**ブックマークレットはペライチのスクリプトになっている必要がある**ので、この作業が必要になります。

バンドラを使う良いところは、npm 経由で落とせるライブラリもブックマークレットとして使えるところだと思います。(ただし、ライブラリをバンドルする場合はコードの再配布にあたるのでライセンス表記をきちんとする必要があります)

今回はバンドラとして [**Bun**](https://bun.sh/) の提供する `Bun.build` を使います。Bun は最近流行っている爆速 JavaScript ランタイムです。

Bun を使うメリットとしては以下のようなことが挙げられます。

- Bun は TypeScript をそのまま実行できる
- `Bun.build` を使うと爆速でブラウザ用のバンドルができる
- `Bun.serve` を使うと簡単に開発用サーバが立つ
- Bun は GitHub Actions でも使える

これらのメリットを活かすと、良い開発体験をキープしたままブックマークレットを簡単に作ることができます。



## 適当に作ってバンドルする

今回は私の大学の学務情報システムのサイトを使ってみます。ディレクトリ構造はこんな感じです。

```
.
├── package.json
├── bun.lockb
├── tsconfig.json
├── node_modules/
└── src/
    ├── index.ts
    └── utils.ts
```

`src/*.ts` にはブックマークレットで実行するスクリプトを書いていきます。

ブックマークレットを作るときは DOM の API を使うと思いますので、 `tsconfig.json` に DOM の型を使うことを教えておきましょう。

```tsconfig.json
{
  "compilerOptions": {
    "lib": ["ESNext"],  // [!code --]
    "lib": ["ESNext", "DOM"],  // [!code ++]
    "target": "ESNext",
```

あとはお好みで linter/formatter を入れたり、テストを入れたりとかやると良いです。とりあえずはこんな構成です。

これをバンドルしていきましょう。次のコマンドを実行するとバンドルできます。

```no-header:sh
bun build ./src/index.ts \
  --outdir ./dist \
  --target browser \
  --minify
```

`src/index.ts` をエントリーポイントとしてブラウザ向けにバンドルしてきます。実行結果は `dist/index.js` として出力されます。

あとは出力結果 `dist/index.js` を

```no-header:js
javascript:(function(){ /* insert code here */ }())
```

の中に突っ込めばブックマークレットの完成です。簡単！

## 開発体験を高める

開発サーバを使うとブックマークレットの開発体験を高めることができます。

次のようなスクリプトを用意しましょう。

```scripts/dev.ts
// Bun.serve で開発サーバを立てる (ポート番号 3000) // [!code highlight]
const server = Bun.serve({
  port: 3000,
  // http://localhost:3000 にリクエストが来たときの処理 // [!code highlight]
  async fetch(req) {
  	// リクエストごとにビルドする // [!code highlight]
    const result = await Bun.build({
      entrypoints: ["./src/index.ts"],
      target: "browser",
      minify: true,
    });

	// エラーハンドリング // [!code highlight]
    if (!result.success || result.outputs.length === 0) {
      return new Response(result.logs.join("\n"), {
        status: 500,
        headers: { "content-type": "text/plain" },
      });
    }

	// バンドルしたスクリプトをクライアントに返す // [!code highlight]
    const artifact = result.outputs[0];
    const script = await artifact.text();
    return new Response(script, {
      headers: {
        "content-type": "text/javascript",
        // CORS
        "Access-Control-Allow-Origin": req.headers.get("origin") ?? "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Private-Network": "true",
      },
    });
  },
});

console.log(`Listening on http://localhost:${server.port}`);
```

`Bun.serve` をすると開発サーバが立ち上がります。引数の `fetch` 関数は `http://localhost:3000` にアクセスがあったときに実行されます。このスクリプトでは、アクセスがあったときに次の処理を行います。

1. src フォルダの中をバンドル
    - バンドルはコマンドだけでなく、`Bun.build()` でも実行できます
2. バンドルに失敗したら 500 番 (Internal Server Error) を返す
3. バンドル結果をクライアントサイドに返す

次に、開発時のブックマークレットの動作確認には次のものを使います。(見やすさのために改行していますが、実際は改行なしで使います)

```js
javascript:(function(){
  var s=document.createElement('script');
  s.src='http://localhost:3000';
  document.body.appendChild(s);
})();
```

これを実行すると `http://localhost:3000` から返されるスクリプトが実行されます。

この方法の良いところは、アクセスごとにバンドルの処理が走るので、**srcで変更した内容が即座にブックマークレットとして反映される**点にあります。わざわざ再ビルドしてブックマークレットを作り直す必要はありません。つまり、ここまで環境が整えば次の開発ループを実現できます。

1. 開発用サーバを立ち上げる
2. ソースコードを編集
3. 開発用ブックマークレットを実行する
4. 2 に戻る

ビルドのトリガーがブックマークレットの呼び出しなので、非常に快適に開発できます。

アクセスごとにビルドを走らせると遅延が気になる……という方もいると思いますが、[**Bun.build は非常に高速**](https://github.com/oven-sh/bun/blob/2fb6733eeb8a4930b96b15f1f3be5f26c0a22325/bench/bundle/README.md)なので (私がやってみた限りでは) まったく問題ないと思います。(esbuild も同レベルに速いですが)

> The `real` results, as run on a 16-inch M1 Macbook Pro:
>
> | Bundler | Time   |
> | ------- | ------ |
> | Bun     | 0.17s  |
> | esbuild | 0.33s  |
> | Rollup  | 18.82s |
> | Webpack | 26.21  |
> | Parcel  | 17.95s |

## 常に最新バージョンを使ってもらう

ブックマークレットは一度世に出してしまうとアップデートすることが難しいです。なぜならばブックマークレットの仕組み上、ユーザにアップデートの通知を出す手段がないからです。(もちろん SNS で告知したりはできますが、厳しいです)

一番良いのは自動でアップデートされることです。そこで開発時に使った方法と似たような方法をとります。GitHub Pages にスクリプトをアップロードして、ユーザには GitHub Pages 上のスクリプトを fetch して使ってもらう方法です。

GitHub Actions を使います。次のようなものを用意します。(定義全体は[ここ](https://github.com/trpfrog/uec-fulfilled/blob/main/.github/workflows/build.yaml)を見てください)

```yaml
jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      # Bun をセットアップ // [!code highlight]
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
      - name: Install dependencies
        run: bun install
      # ./dist にビルドする // [!code highlight]
      - name: Build
        run: bun run build
      # ./dist 配下を GitHub Pages で公開 // [!code highlight]
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

これで GitHub への push 時にビルドが走り、スクリプトが GitHub Pages 上に公開されました。
今回の場合、`https://<GitHubのユーザ名>.github.io/<リポジトリ名>/index.js` に公開されていると思います。

例えば私の作ったブックマークレットのスクリプトは https://trpfrog.github.io/uec-fulfilled/index.js に公開されています。

次にこの URL をブックマークレットに埋め込みます。

```js
javascript:(function(){
  var s=document.createElement('script');
  s.src='https://trpfrog.github.io/uec-fulfilled/index.js';
  document.body.appendChild(s);
})();
```

こんな感じになります。(実際は改行を消して使ってください)

この方法を使うと、リモートのスクリプトを fetch して実行するので**常に最新版をユーザに使ってもらうことができます**。

ところでスクリプトを fetch するなら1ファイルにバンドルする必要はない気がしてきました。いいえ、パフォーマンスを考えれば結局バンドルはした方が良いです。

## まとめ

Bun + TypeScript + GitHub Pages を使ってブックマークレットを快適に開発するやつをやりました。`Bun.build` でバンドルすれば、大きなプロジェクトも簡単にブックマークレットにすることができます。`Bun.serve` を使って開発サーバを立てれば、ブックマークレット開発が捗ります。バンドルしたやつを GitHub Pages に置いておけば自動アップデートもできて良い感じです。

Bun はいろいろ便利機能を持っているのでこれ一つでなんでも作れる感じがして良いですね。
今回はテストを書きませんでしたが、爆速テストランナーもついていてすごい。

「Web の便利スクリプトを作りたいけど拡張機能として公開するまでもないな〜」という方は、ぜひ Bun + TypeScript + GitHub Pages でブックマークレットを作ってみてはいかがでしょうか？
