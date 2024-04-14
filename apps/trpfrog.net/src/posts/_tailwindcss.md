---
title: CSS Modules から Tailwind CSS に移行した
date: 2024-12-25
tags:
  - 技術
description: 大きめのサイトを段階的に Tailwind CSS に移行するまで

---

こんにちは、つまみ ([@TrpFrog](https://twitter.com/TrpFrog)) です。

> [!IMPORTANT]
> <b>グオー</b>
> うおうお！
> うおうお！


## TL;DR

- Tailwind CSS を使うと1つのファイルにスタイルとマークアップを共存させられて嬉しい
- Tailwind CSS にはいくつか懸念点があったが工夫でなんとかできそう
  - 可読性の悪さ → コンポーネント分割 + Tailwind Variants で軽減
  - ロックインされないか → 一応 `tw-` prefix つければマシになりそう
- CSS Modules からの移行は苦行だが工夫次第で負担を軽減できる
  1. **グローバル CSS の削除 💪**
  2. **その他壊れている箇所の修正 💪**
  3. あとはゆっくり段階的な移行


## このサイトについて

移行当時の当サイトの技術スタック (一部) は以下の通りです。

- Next.js 14
- React 18
- Sass (SCSS)
- CSS Modules (一部グローバルのスタイルあり)

## SCSS + CSS Modules のつらさ

基本的にはこの運用で問題なくできていたのですが、サイトが大きくなるにつれて以下のような問題が出てきました。

### 保守におけるつらさ

- SCSS + CSS Modules は管理していく中でいろいろな辛さが出てきた
  - 自由度が高くて散らかってきた
    - 特にネスト、`@use`
    - これはコーディング規約でどうにかできそうだけど
  - 別のファイルに分割しなければいけないので、一覧性に欠ける
  - CSS 自体の記述量が多い (ボイラープレートが多い)
  
### 特殊な事情

Next.js の開発元 Vercel は webpack をやめて現在 turbopack に移行しようとしています。turbopack のというのが、その Vercel の現在開発中のバンドラなのですが、これが SCSS をオフィシャルでサポートしていないという問題があります。

今年の夏頃に基本的な機能のサポートの PR はマージされたのですが、この動きを見るに Vercel はそこまで SCSS をサポートする気はなさそうに思えます。逆に、Taiwind に関してはかなり積極的にサポートされており、`create-next-app` すると出てくるダイアログには「Tailwind でプロジェクトを作成しますか？」という旨のオプションが出てくるほどです。この Vercel の姿勢からも、SCSS を脱却して Tailwind に移行した方が良さそうな気がしてきます。個人的にこの部分はあまり気に入りませんが (CSS Modules はサポートしています、念の為)

ちなみに SCSS + import alias (`@use '@/styles/mixin'` のように `@/*` を使うと project root から辿ってくれるやつ) は現在の turbopack でもサポートされていなさそうで苦しいです。webpack を使わざるを得なくなっています。webpack やめたすぎ

### 負の遺産

これは技術ではなく私が悪いのですが、単純にこのリポジトリに「よくないコード」がたくさんあるという問題があります。というのもこのサイトは私が、**HTMLすらまともに書けない Web ド素人だった** 2019 年から存在しているため、酷いCSSがたくさん残っています。あまりに酷すぎるものはだいぶリファクタリングしたのですが、それでも修正が大変という理由で放置してしまっているものが多々あります。
 
<br>

このような状況において、CSS を刷新するのならば！と白羽の矢が立ったのが Tailwind CSS でした。もちろん技術的に興味があった部分も大きいですが……。

## Tailwind CSS に感じる懸念点

もちろん「Tailwind にしたいぜ！」という気持ちからこの移行の作業をするわけですが、実は私はもともと Tailwind アンチ (食わず嫌い) でした。そのアンチの私がなぜ移行に踏み切ったのかを簡単に書こうと思います。

### 懸念点 1: 負債になりそう

ここでの負債の定義はふわふわとしたもので「なんとなく将来腐って移行がめんどくさくなりそうだな〜」というものです。Tailwind CSS が廃れてきたり、自分個人として tailwind のユーティリティクラスの面倒を見きれなくなったとき、移行にかかるリスクの話です。

これに関しては、もう仕方ないと割り切ることにしました。だいたいもう今の時点で**昔のコードが負の遺産になっている**のだから、もうそういうものだと割り切ります。コードは書いた時点で負債になるという言葉もありますからね。

ただ、Tailwind CSS 自体が腐るリスクはそこまでないんじゃないかな〜と楽観視しています。
数年前は「なんだこのフレームワーク！？」とかなり威嚇していましたが、なんだかんだ生き残り続けてエコシステムも整ってきています。もう流石にユーティリティクラス業界のデファクトスタンダードになるであろう、今後もメンテナンスされ続けていくであろうという気持ちから、すぐに腐ることはないと判断しました。腐るにしてもまた数年後で、その頃には私が今から書く Tailwind のコードが腐っていると思います。

  
### 懸念点 2: クラス名が汚い

クラス名が汚いのでソースを読んだときにドン引きする問題はあると思います。
とはいえ、それはサイトのソースを読もうとする僕らみたいな変な人たちに限ったことであって一般人は知ったこっちゃありません。

それに加えて、今使っている CSS Modules もそこまで綺麗なクラス名は吐きません。`CodeBlock_lines__zP4ZA` みたいなのを出してきます。確かに汚さのレベルは違いますが……
  
### 懸念点 3: クラス名の略称がつらそう

もうこれは慣れだと思っています。我々が CSS のプロパティ名を勉強 (？) してきたように、Tailwind のクラス名もまた覚えていけば良いと思いました。力業

それに、IDE や AI の支援があるので、基本的な部分はうろ覚えて適当にキーボードを叩いておけばいい感じに補完してくれると思うのでいけると思いました。

実際使った感想ですが、細かい部分を Tailwind で表現するのはまあまあしんどいものがありました。しかし、margin, padding, font-size, width, height, border などよく使うものに対応するクラス名に関しては、よく使うのですぐ覚えられる、というか勝手に覚えたので大丈夫だと思います。

### 懸念点 4: className がスタイルで汚染されてマークアップが読みにくくなる

これはフォロワーの方が教えてくださった Tailwind Varinats というライブラリを使うと解決することができます。

<details>
<sumamry>Tailwind Variants を使う</summary>


これはコードを見てもらえれば早いと思います。例えば、以下のコードは tailwind らしいと思います。

```BlogH2.tsx
import * as React from 'react'

import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { A, H2 } from '@/components/wrappers'

export function BlogH2(props: React.ComponentPropsWithoutRef<'h2'>) {
  const { className, children, ...rest } = props
  return (
    <H2 
      className="
        tw-relative tw-mt-10 tw-w-full
        tw-border-b-2 tw-border-solid tw-border-b-trpfrog-300
      "
      {...rest}
    >
      <span className="tw-peer tw-w-full">{children}</span>
      <A 
        href={'#' + props.id}
        className="
          tw-absolute -tw-left-7 tw-top-0 tw-pr-2 tw-opacity-0 sp:tw-hidden
          peer-hover:tw-text-gray-300 peer-hover:tw-opacity-100
          hover:tw-text-body-color hover:tw-opacity-100
        "  
      >
        <FontAwesomeIcon icon={faPaperclip} />
      </A>
    </H2>
  )
}
```

ただ、このコードは JSX の部分が読みづらくなってしまっています。
スタイルのせいでコンポーネントの構造が読みにくくなるのは好ましくないです。
これこそ、私が Tailwind を好まない理由でした。

しかし次の書き方はどうでしょうか？


```BlogH2.tsx
import * as React from 'react'

import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { tv } from '@/lib/tailwind-variants'

import { A, H2 } from '@/components/wrappers'

const styles = tv({
  slots: {
    h2: [
      'tw-relative tw-mt-10 tw-w-full',
      'tw-border-b-2 tw-border-solid tw-border-b-trpfrog-300',
    ],
    text: 'tw-peer tw-w-full',
    anchor: [
      'tw-absolute -tw-left-7 tw-top-0 tw-pr-2 tw-opacity-0 sp:tw-hidden',
      'peer-hover:tw-text-gray-300 peer-hover:tw-opacity-100',
      'hover:tw-text-body-color hover:tw-opacity-100',
    ],
  },
})()

export function BlogH2(props: React.ComponentPropsWithoutRef<'h2'>) {
  const { className, children, ...rest } = props
  return (
    <H2 className={styles.h2({ className })} {...rest}>
      <span className={styles.text()}>{children}</span>
      <A href={'#' + props.id} className={styles.anchor()}>
        <FontAwesomeIcon icon={faPaperclip} />
      </A>
    </H2>
  )
}
```

スタイルと JSX が分かれてすっきりしました。これこそが私のしたかったことです。

</details>
  
### 懸念点 5: 呪文が長すぎて読解が難しくなりそう

長すぎになったら、改行したりコンポーネント分割したりしたら良いと思いました。
  
### 懸念点 6: CSS ほどの自由度はなさそう

- CSSほどの自由度はなさそう
  - 自由度ありすぎるとカオスになるから逆に良いかも
  
### 懸念点 7: ロックインされそう

  - はい
  - prefix つければ剥がしやすくなるのである程度はマシになると思う (`tw-`)
  
## 逆に Tailwind CSS の良いと思うところ

## 他の CSS フレームワークの検討

今回は以下のようなものを検討しました。検討したと言っても、かなり Tailwind に贔屓している部分が大きいのでちゃんと検討しているとは言えないかもですが……。

- CSS + CSS Modules
  - 乗り換えは楽？
  - Media query に変数が使えないのがつらい
- コンポーネント系の CSS in JS
  - コンポーネントベースのものはマークアップと密結合されるので使うのを避けたい (ロックインされる)
  - 薄い wrapper を使う案もあるが、そこまでするならそういう責務を持ったコンポーネントに軽く Tailwind 書けば良くないですか？という気持ちもある (そんなに単純ではない？)
    - 使ったことがないのでここは後々検討すれば良さそう……
- vanilla-extract
  - わりと有力だったが、`.css.ts` に書かなければいけない仕様がつらかった
- Kuma UI
  - 良さそうだけどやっぱりロックインされないか不安
  - 新しすぎる？今採用するのはリスクが大きいかも
- Tailwind CSS + Tailwind Variants
  - 最有力、モダンな技術で単純に興味がある
  - モダンかつエコシステムが整ってきていて、長く便利に使えそう
  - かなり懸念点はあったものの、後述の理由によりこれを使いたい

## CSS Modules から Tailwind CSS に移行する

移行するにあたり、事前に調査をそこそこしたのですが、CSS から Tailwind CSS に移行しましたという記事はなかなか見つからず困りました。小規模なサイトを運営しているからがゴリッとデザインごと刷新する記事ならあったのですが、私の場合はデザインをできるだけそのままにしたいので困りました。

Snapshot テストを入れてやる方法も考えたのですが、Tailwind 特有の Preflight.css によりすべてを破壊されるので意味がありません。そう考えた結果、ゴリッと力ずくで移行するのが早いと思いそうしました。(悲しい)

とはいえ、ある程度の悪あがきはしました。雑に書けば以下のような流れで移行します。

0. Tailwind CSS のドキュメントを読む
1. Tailwind CSS を導入する
2. **リセット CSS に破壊された箇所を修正する💪💪💪**
3. 段階的に Tailwind CSS に置き換えていく

また、移行のためのコードはできるだけ tailwind らしくない書き方にしようと思いました。他の CSS-in-JS のライブラリの書き方に近づけたいと思います。




### 0. Tailwind CSS のドキュメントを読む

食わず嫌いしていたので、導入っぽい部分をまずきちんと読みました。印象に残った部分だけ列挙します。

### 1. Tailwind CSS の導入

まず強引に Tailwind CSS を入れました。導入の際には Preflight.css というリセットCSSが入ってくるのでサイトのデザインがある程度崩れます。(もちろん、これは外せるのですが、Tailwind としてはこれを入れた前提で話が進むので、できるだけ入れた方が良い)

ここで**パワー**を使って解決します。

### 2. リセットCSSに破壊された箇所を修正する 💪

ここが一番の力業ポイントではありますが、無理なくパワーを発揮するために移行の順序を工夫しました。

#### 2-1. SCSS から import alias を剥がす

まず turbopack を使って作業したいので SCSS から import alias を剥がしました。

#### 2-2. グローバルの CSS を消し去る

