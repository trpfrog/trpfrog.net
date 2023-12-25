---
title: レンタサイクルを乗り継いで節約するのはやめた方が良い
subtitle: 散歩・徒歩・苦行 Advent Calendar 2023
date: 2023-12-25
held: 2023-12-10
tags:
  - 自転車
  - 長編記事
description: TVアニメ「ぼっち・ざ・ろっく！」最終回から一周年なので下北沢から金沢八景までレンタサイクルで行ってきた／ユーフォクリアファイルを求めてイオンもハシゴするよ
thumbnail: https://res.cloudinary.com/trpfrog/blog/bocchi-the-cycling/thumbnail.jpg

---

<!-- begin head -->

<style>
.rental-block {
  display: flex;
  gap: 3px; 
  flex-direction: column;
  align-items: center;
  line-height: 1.5;
  margin: 5em 0
}
.rental-block-top-text {
  font-size: 1em;
  font-weight: bold;
  text-align: center
}
.rental-block-title {
  font-size: 2em;
  width: fit-content;
  font-weight: bold;
  border-width: 2px 0 2px 0;
  border-color: var(--body-background, lightgray);
  border-style: solid;
  line-height: 1.6
}
.rental-block-bottom-text {
  text-align: center;
}

.bicycle-itemize ul {
  & > li:before {
    position: absolute;
    top: -3px;
    left: -1.2em;
    content: '🚲';
    background: none;
  }
}
</style>

```define-component
start-rental

let [finishHour, finishMinute] = props.start.split(':').map(e => parseInt(e, 10))
finishMinute += 30;
if (finishMinute >= 60) {
  finishMinute = finishMinute % 60;
  finishHour = (finishHour + 1) % 24;
}
const finish = `${finishHour}:${finishMinute < 10 ? ('0' + finishMinute) : finishMinute}`

return `
<div class="rental-block">
<div class="rental-block-top-text">
${props.times ? `🚲 ${props.times} Ride 🚲<br>` : ''}${props.station}
</div>
<div class="rental-block-title">
${props.start} レンタル開始
</div>
<div style="text-align: center">
返却期限 ${finish}
</div>
</div>
`;
```

```define-component
finish-rental

let [startH, startM] = props.start.split(':').map(e => parseInt(e, 10))
let [finishH, finishM] = props.finish.split(':').map(e => parseInt(e, 10))

const startMinutes = startH * 60 + startM;
const finishMinutes = finishH * 60 + finishM;

const minutes = finishMinutes - startMinutes;
const price = minutes > 30 ? 230 : 130;

return `
<div class="rental-block">
<div class="rental-block-top-text">
${props.times ? `🚲 ${props.times} Ride 🚲<br>` : ''}${props.station}
</div>
<div class="rental-block-title">
${props.finish} 返却完了
</div>
<div class="rental-block-bottom-text">
利用時間 <b style="${minutes > 30 ? 'color: red' : ''}">${minutes}</b> 分<br>料金 <b style="${minutes > 30 ? 'color: red' : ''}">${price}</b> 円 (累積 <b>${props['total-price']}</b> 円)
</div>
</div>
`;
```

<style>

.time-limit {
  border-bottom: #c9abab 5px solid;
  font-size: 1.2em;
  font-weight: bold;
  line-height: 1;
  vertical-align: baseline;
  width: fit-content;
  padding-right: 3px;
  margin: 1.5em 0;
}
.time-limit:before {
  content: '\23F3'; /* ⏳ */
  margin-right: 4px;
  font-size: 1.2em;
}
.time-limit[data-time-limit="expired"]:before {
  content: '\231B'; /* ⌛️ */
}
.time-limit-counter {
  font-size: 1.5em;
  letter-spacing: -1px;
}

</style>

```define-component
time-limit

let [startH, startM] = props.start.split(':').map(e => parseInt(e, 10))
let [currentH, currentM] = props.current.split(':').map(e => parseInt(e, 10))

const startMinutes = startH * 60 + startM;
const currentMinutes = currentH * 60 + currentM;
const minutesLeft = 30 - (currentMinutes - startMinutes);

if (minutesLeft >= 0) {
  return `<div class="time-limit">返却予定時刻まで残り <span class="time-limit-counter">${minutesLeft || 1}</span> 分${minutesLeft === 0 ? '未満' : ''}</div>`
} else {
  return `
<div class="time-limit" data-time-limit="expired">
返却予定時刻から <span style="color: red"><span class="time-limit-counter">${-minutesLeft}</span> 分経過</span>
</div>`
}
```

<!-- end head -->

```centering
**この記事は<span class="ib">「[散歩・徒歩・苦行 Advent Calendar 2023](https://adventar.org/calendars/8696)」</span>
<span class="ib"><span style="font-size: 1.5em">25</span> 日目の記事です。</span>**
```

```link-embed
https://adventar.org/calendars/8696
```

24日目の記事は**電気通信大学体育会ヨット部**さんの『**電通大ヨット部1年目が徒歩部に参戦してみる件**』でした。**ヨット部！？**

```link-embed
https://salty-angelfish-229.notion.site/1-1741eafe621148b5a14753e7c61162e9
```

変な個人の生やした謎のアドベントカレンダーに部活動の人が記事寄稿してくださることあるんだ……ありがとうございます。

> ほかの部活とも関わってみたいのでたぶん参加登録したのですが

絶対変なオタクしか読んでないと思います……。

> **冬でも体験会やってるので来てください^^/**

```use-effect
const div = document.getElementById('edit-me-impression')
let flag = false;
const defaultText = div.innerText;

let timeoutId = null;
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    timeoutId = setTimeout(handler, 1000);
  }
});

const handler = async () => {
  if (!flag) {
    flag = true;
    const asyncSleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const l = div.innerText.length;
    for (let i = 0; i < l; i++) {
      div.innerHTML = div.innerText.slice(0, -1) || '&nbsp;';
      await asyncSleep(20);
    }
    div.style = 'font-weight: bold; min-height: 50px';
    const msg = '読者の皆さんも是非体験に行かれてはいかがでしょうか？';
    for (let i = 0; i < msg.length; i++) {
      div.innerText = msg.slice(0, i + 1);
      await asyncSleep(50);
    }
  }
};

observer.observe(div);

return () => {
  observer.disconnect();
  clearTimeout(timeoutId);
  div.innerText = defaultText;
}
```

<div id="edit-me-impression" style="opacity: 0.5; font-style: italic; font-weight: bold; width: 100%; min-height: 50px">
お前を苦行へと誘う……
</div>

<!-- window break -->


こんにちは、つまみ ([@TrpFrog](https://twitter.com/trpfrog)) です。
<b>「散歩・徒歩・苦行 Advent Calendar 2023」</b>も最終日、**25日目**でございます。
~~4記事くらいメロンパンですが、~~ **まさか25日分も埋まるとは**夢にも思っていませんでした。
記事を寄稿してくださった皆さん本当にありがとうございます。
いろいろな徒歩・苦行を見られて大変満足しております。

その昔、**小学生の頃**、アドベントカレンダーというものに興味を持ちまして、友人各位に「アドベントカレンダーやりませんか！？！？」と言ったものの、**全員から「は？」という顔をされて企画が頓挫した**こともありました。やっとできて良かったです。

改めて参加してくださった皆さん、ありがとうございました。

---

さて、最終日の苦行を始めていきましょう。
自分でカレンダーを立てておいてアレなのですが、今回は**逆張って**、徒歩ではなく**自転車**を使ったあることに挑戦してみようと思います。
**最近微妙に膝が痛い**ですからね、皆さんも気をつけてください。

皆さんは**レンタサイクル**をご存知でしょうか？お金を払うと電動自転車 (とは限りませんが) を貸してくれるサービスがあります。

![](/blog/bocchi-the-cycling/rentacycle.jpg?w=1238&h=626 "電通大前のレンタサイクル (ストリートビューより)")

レンタサイクルをやっている会社もいろいろあるのですが、今回その中でもメジャーであると思われる **HELLO CYCLING** を使って長距離を走ってみようと思います。

## ルール

### 目的地

今回走る区間ですが、**下北沢から金沢八景 (神奈川県)** とします。

![](/blog/bocchi-the-cycling/42map.jpg?w=1419&h=1846 "Googleマップ情報だと42kmだが……？")

なぜこの区間か？と言いますと、記事の投稿日の今日、2023年12月25日が **TVアニメ「ぼっち・ざ・ろっく！」最終回の放送からちょうど1年**だからです。**？**

ぼっち・ざ・ろっく！未履修の方に説明しますと、作品の舞台が下北沢で、主人公のぼっち、後藤ひとりの家が金沢八景 (神奈川県) なので、この区間を自転車で走ろう！ということです。**なぜ？**

ちなみにこのルートの端点以外に聖地は存在しません。なので**ほとんど聖地巡礼と全く関係ない記事**となっております。

それと原作5巻には……

```conversation
伊地知虹夏: あとはひたすら練習あるのみ！
伊地知虹夏: ……で、熱中し過ぎてぼっちちゃんだけ終電逃しちゃったと……
後藤ひとり: あっはい
後藤ひとり: あっじゃあまた月曜日、**レンタサイクルで帰ります**
ゲーミング虹夏: **徒歩じゃないの！？** 👹
```

……というぼっちが終電を逃してそのままレンタサイクルで帰るエピソードがあるので、ファンとして真似してみたかったのもあります。**(そんなエピソードはない)**


### レンタサイクル

ただレンタサイクルで走るだけでは「電動のママチャリで走ってきたよ〜笑」という記事になってしまいます。**苦行要素が皆無**です。そこで **HELLO CYCLING のシステム**に注目したルールを設けたいと思います。

> |都道府県|市区町村                     |利用開始30分まで|延長15分ごと|12時間まで|
> |--------|-----------------------------|----------------|------------|----------|
> |東京都  |<small>※板橋区を除く</small>|130円〜         |100円〜     |1800円〜  |
> |神奈川県|<small>※箱根町を除く</small>|130円〜         |100円〜     |1800円〜  |
> 
> <small> 利用料金表 (https://www.hellocycling.jp/notice/index.html) より一部抜粋 </small>

この表を見てください。東京都や神奈川県では基本、**最初の30分は130円、それ以降は100円/15分**という設定になっています。これはつまり、**最初の30分で乗り捨てて、次々と新しい自転車に乗った方が安い**ということです。

![](/blog/bocchi-the-cycling/price.png?w=2212&h=890 "乗り換えると安くなるイメージ")

HELLO CYCLING では**対応している駐輪場 (ステーション) で乗り捨てができる**ためこのようなことが可能になっています。ということで、少しでも交通費を抑えるため次のルールを設けます。

````titled-frame
ルール (1)

```centering
***借りた自転車は30分以内に返却する***
```

間に合わなかった場合も「でもどうせ延長したんだからもうちょっと走ろうよ〜」とか言わず、急いで最寄りのステーションに返却する。
````

微妙に「少しでも交通費を抑えるため」に反している気がしますが、気にしないことにします。

それともうひとつ、このままでは**同じステーションで自転車を交換する**ことが最適解になってしまいます。<b>「1時間無料の駐輪場で1時間おきに自転車抜き差しすればずっと無料で駐輪できる」</b>みたいなセコさがあるので、このルールを付け加えたいと思います。

````titled-frame
ルール (2)

```centering
***同じステーションは2度以上利用しない***
```

![](/blog/bocchi-the-cycling/cycle.png?w=2190&h=898)

利用開始・返却をそれぞれ1回の利用とみなして、2度以上の利用をしない。
ステーション間の移動は徒歩で行う。
````

いい感じに徒歩タイムも設けられて楽しそうです。
ちなみにステーションはかなり密集して存在しているので、長距離徒歩が発生することはなさそうです。

以上、2つのルールでレンタサイクルに乗り、**下北沢から金沢八景まで**行ってみたいと思います。

それでは始めていきましょう！

<!-- window break -->

## 2023年12月10日 11:00 🚃 下北沢駅

![](/blog/bocchi-the-cycling/IMG_1758.jpg?w=3502&h=2627 "下北沢駅のぼざろ広告")

午前11時 **下北沢駅**でございます。なぜスタートがこんな遅い時間になってしまったのかと言いますと、**今日の私にはレンタサイクルがあるから**です。

![](/blog/bocchi-the-cycling/googlemap.jpg?w=1179&h=2327)

Google マップも**3時間**で着くと言っています。いや〜〜〜〜〜流石に目標設定間違えましたね！このままいけば「苦行」でなくなるので困っちゃいますね！<b>「徒歩も苦行もやめるとこんなに楽しいです！いかがでしたか？」</b>と煽る形でカレンダーを締めくくることになります。それもアリ！笑

徒歩ですら「10時間」で着くのですから自転車が10時間以内につけないわけがないです。余裕も余裕です。

![](/blog/bocchi-the-cycling/IMG_1763.jpg?w=4032&h=3024)

そういうわけで改札を出て最初の目的地を目指します。

## 11:10 🚶 ダイエー下北沢店

![](/blog/bocchi-the-cycling/IMG_1764.jpg?w=4032&h=3024)

すみません、初っ端から脱線をしております。**ダイエー下北沢店**です。

実は、今回のサイクリングにはもうひとつの目的があります。それは <b>"赤城乳業「Sof'」シリーズ× 『響け！ユーフォニアム～アンサンブルコンテスト～』コラボ" クリアファイル</b>の回収です。(オタク)

```link-embed
https://anime-eupho.com/news/?id=512
```

サイトを見ていただければわかる通り、**激ヤバ絵柄**です。**ええ！？！？！？！？なんで同じ味のアイス食べさせてるの！？！？！？！？何！？！？！？**

たった150円程度のアイスを2つ買うだけで、描き下ろし激ヤバ絵柄クリアファイルがもらえる怖いキャンペーンです。**これもうクリアファイルにアイスが付いてきてるようなものだろ**

```horizontal-images
![](/blog/bocchi-the-cycling/25050BE7-B255-45BE-A690-0D1EA44C5494_1_105_c.jpg?w=1024&h=768)
![](/blog/bocchi-the-cycling/7BC698E1-50AF-4CD8-B587-D61D6DFD2149_1_105_c.jpg?w=1024&h=768)
新百合ヶ丘のイオンから西麻布のイオンまではしご徒歩している様子 (12月8日)
```

キャンペーンが始まったのが**12月6日**、私がこのキャンペーンのことを知ったのは**12月8日**のことでした。
当然血眼になって、キャンペーンを実施している近隣 **7** 店舗 (イオン・ダイエー) を巡りました。
しかし、強火オタクの手により**在庫はとっくに枯れており**途方に暮れるしかなかったのです。
漏れは敗北したのです。

![](/blog/bocchi-the-cycling/IMG_D225C632346D-1.jpg?w=1179&h=1694)

しかし、翌日届いたオタクからのDMにより事態は一転します。なんと、**まだ在庫のある店舗がある**というのです。
銚子には行けなくても、これから自転車で向かう先々のイオンには在庫があるかもしれないのです。ワクワクしませんか？ということで**宝探し**的に、イオン巡りもしていこうと思います。

ちなみにダイエー下北沢店には当然なかったです。**次！**

---

話が長引いてしまいました。そんなわけで今日は**金沢八景に行きつつ、ダイエー・イオンも巡る**という流れで進めていきたいと思います。

![](/blog/bocchi-the-cycling/63B5DAEF-D85E-4484-BCF9-2F7508B64C2E_1_201_a.jpg?w=4032&h=3024 "うどんうどんうどん")

ということで最初の<ruby>駐輪場<rp>(</rp><rt>ステーション</rt><rp>)</rp></ruby>、**SANパーク下北沢4** を目指します。

![](/blog/bocchi-the-cycling/E5AB508A-DBDE-4E57-BF08-702B16F5F6C9_1_201_a.jpg?w=3184&h=2388 "小さすぎる古着屋")

![](/blog/bocchi-the-cycling/1A63DA83-30ED-4D6F-B01D-D114201F2982_1_201_a.jpg?w=4032&h=3024 "六差路")

## 11:26 🚶 SANパーク下北沢4

![](/blog/bocchi-the-cycling/BE94F7FC-0AAB-4A88-B47E-179CA638314A_1_201_a.jpg?w=4032&h=3024)

のろのろ歩いていると着きました、最初のステーション SANパーク下北沢4 です。ここで事前に予約していた自転車を借ります。

![](/blog/bocchi-the-cycling/BA67AFAA-0E70-46B8-9469-8E4E67E92D09_1_201_a.jpg?w=1179&h=1092)

その場でも借りられるのですが、今日はこの画像の通り**大人気アトラクション**なので、利用可能な自転車が現れたらすぐ予約！という勢いでいかないと死にます。しかも、下北沢周辺のステーションが枯れると、次に近いステーションが**2km先の三軒茶屋**となりだいぶ苦しいです。せっかく自転車の使える今回、徒歩をすることは最も愚かな行為であると言われています。


```twitter-archived
id: 1733676254833025475
date: 2023-12-10
tweet: 今回は課金アイテムを使います、ふっふっふ
```

![](/blog/bocchi-the-cycling/15157162-E31C-4E0E-9073-2473729FD9F2.jpg?w=4032&h=3024)

なんとか予約できたこの自転車に乗り込みます。自転車の近くから、HELLO CYCLING アプリの「**解錠**」ボタンを押すとレンタル開始です。


![](/blog/bocchi-the-cycling/4410A495-DE73-4272-95C9-89DBCD62DE18_1_201_a.jpg?w=1179&h=493 "解錠ボタン")

それでは自転車に乗って次の目的地、**三軒茶屋**に向かいましょう！

```use-defined-component
use: start-rental
station: SANパーク下北沢4
start: 11:29
```


ということで始まり……**ｸﾞﾆｭ**

**おや？**

![](/blog/bocchi-the-cycling/BD7FE348-3BFC-47E2-8AF1-2D34AC457647_1_105_c.jpg?w=1024&h=768)

```centering-with-size-bold
2em
初手パンク自転車
```

```use-defined-component
use: finish-rental
station: SANパーク下北沢4
start: 11:29
finish: 11:31
total-price: 0
```


**幸先が悪すぎる**

幸い、HELLO CYCLING では**同一ステーションに3分以内に返却する**場合に限り、レンタル料が0円になります。
こういうトラブルを踏んだ場合は慌てず落ち着いて、素早く返却しましょう。

```link-embed
https://www.hellocycling.jp/faq/
```

> 安全のため、該当車両の利用は中止いただき、 別の車両をご利用ください。利用開始から3分以内に同一ステーションに返却いただければ料金はかかりません。<br>
> また、よろしければアプリ内「ヘルプ」ページの「自転車の不具合」フォームより状況をお知らせいただけますと幸いです。

不具合連絡する場所見当たらないから放置してたんですけど、一応伝えるフォームあったんですね……送ればよかったぜ、**すまん！**
自転車のバッテリー交換ついでに点検してくれるものだと思ってました。

![](/blog/bocchi-the-cycling/chazawa.jpg?w=1069&h=1531)

先にも述べたように**この近くに借りられる自転車がない**ので、最初は歩いて三軒茶屋に向かいます。いつまでも自転車移動するシーンが出てこねえ！



```twitter-archived
id: 1733676431052615863
date: 2023-12-10
tweet: おい！パンクしてんじゃねえか！<b>徒歩開始❗️</b>
```

```twitter-archived
id: 1733693135958753300
name: デギ
userid: degui_3bitto
date: 2023-12-10
tweet: <b>どこまでも徒歩に恵まれてて笑顔</b>
```

![](/blog/bocchi-the-cycling/B2DA15B5-31AE-4800-89BA-28C373E825DE.jpg?w=4032&h=3024 "駐輪場にあった良い張り紙")

## 11:35 🚶 三軒茶屋へ向かう

仕方ないので歩いて三軒茶屋に向かいます。**くやし〜〜〜〜**

![](/blog/bocchi-the-cycling/1524C010-9F39-485C-889A-D356E968D146_1_102_o.jpg?w=2048&h=1536)

進みます。

![](/blog/bocchi-the-cycling/3B317302-32FB-42DB-99D3-210937AE2A58_1_201_a.jpg?w=2767&h=2075 "おしゃれシャッター")

![](/blog/bocchi-the-cycling/9302E5A7-65C4-4E9C-B210-855E67A0F7A8_1_201_a.jpg?w=4032&h=3024 "川沿いの緑道")

世田谷近辺では川？沿いの緑道をよく見かける気がします。
良い散歩道のある地域の人はちょっと羨ましいですね。僕もそういうところ住みたいぜ

![](/blog/bocchi-the-cycling/0FCA31F0-7744-426A-9ECB-8EF83E35D8EC_1_102_o.jpg?w=2048&h=1536)

進みます。

ブログに書くネタを集めるためにボイスメモをつけながらぼそぼそ喋っていたのですが、不審者だったかもしれません。ちなみに今まったくボイスメモを参考にせずに記事を書いているので、本当に無意味です。

![](/blog/bocchi-the-cycling/2C54A08D-55C8-44A4-9ED3-2E5FBA23D51F_1_201_a.jpg?w=4032&h=3024 "なんで撮ったのか全く覚えてないけど、気付きがあったので撮って良かった写真")

ここの通りは「**茶沢通り**」というらしいです。三軒**茶**屋と下北**沢**を結ぶからでしょうか。

![](/blog/bocchi-the-cycling/1A1CD04A-E4DD-4F13-8F5F-877F465EF4AD_1_102_o.jpg?w=2048&h=1536)

LUUP の自転車がありました。これに乗っても良いかな〜とも思ったのですが、

![](/blog/bocchi-the-cycling/7AC2A692-CAB0-4385-BCD2-4CF5C1C08CE4_1_201_a.jpg?w=3007&h=2255)

**基本料金 50 円 + 時間料金 15 円／分** だったのでやめました。<br>
**30分500円！？！？** 今僕は 30 分 130 円乗り継ぎ乞食をやろうと思ってるのに……

```link-embed
https://luup.sc/news/2023-09-29-fee-revision/
```

今調べてみたのですが、11月から価格改定があって**30分200円**になっていました。**それでも高い……**
サブスク入るとマシになるっぽいのでサブスク前提のサービスなのかも

![](/blog/bocchi-the-cycling/EE4AD4E3-89C9-449B-BAE6-EDFB313003D1_1_102_o.jpg?w=2048&h=1536)

進みます。

![](/blog/bocchi-the-cycling/F95B8384-A232-441A-B623-D71E01A32EF6_1_102_o.jpg?w=2048&h=1536 "👁️")

## 12:00 🚶 三軒茶屋駅

![](/blog/bocchi-the-cycling/4192DDCD-6B08-435D-8765-F991F4B1A5C6_1_102_o.jpg?w=2048&h=1536)

いまいち景色の分かりにくい写真ですが、**三軒茶屋駅**に着きました。

![](/blog/bocchi-the-cycling/1C4CA1DB-4951-471D-A1EA-E206E9E200B3_1_102_o.jpg?w=2048&h=1536)

右側はこうです。

三軒茶屋、勝手にもうちょっとおしゃれなイメージを抱いていたのですが、意外とごちゃついていますね。
なんでも雑多にあって住みやすいかもしれません。

![](/blog/bocchi-the-cycling/227AFAED-7055-48D3-B38A-97D2924E5939_1_201_a.jpg?w=1179&h=1534)

三軒茶屋のレンタサイクルも当然**大人気アトラクション**なので、ほとんど利用中かどこかに持ち出されています。そんな中一箇所だけ自転車があったので急いで予約します。

ところで、この近くには**ダイエー**があります。予約は30分間有効なので、その隙にダイエーに行ってしまいましょう。

<div class="time-limit">予約解除まで残り <span class="time-limit-counter">30</span> 分</div>

![](/blog/bocchi-the-cycling/CF663002-1E0D-480A-BE18-FF99F35027E4_1_102_o.jpg?w=2048&h=1536)

予約の有効期限が切れないうちに急いでダイエーに向かいます。

![](/blog/bocchi-the-cycling/380662A8-F558-454D-8D39-12316EF4065D_1_102_o.jpg?w=2048&h=1536 "胃袋みたいな道")

![](/blog/bocchi-the-cycling/B1E2CD52-99E1-4F81-B269-B80F527F9C78_1_201_a.jpg?w=4032&h=3024 "サンタさんいる！")

![](/blog/bocchi-the-cycling/1B1EEE65-FB3D-4E82-B122-D36F22BED5C7_1_102_o.jpg?w=2048&h=1536 "商店街的なものを進む (ボケすぎ)")

## 12:06 🚶 ダイエー 三軒茶屋店

<div class="time-limit">予約解除まで残り <span class="time-limit-counter">25</span> 分</div>

![](/blog/bocchi-the-cycling/BF27FBE3-C0AA-4D89-8447-0A8BAF80D8B3_1_102_o.jpg?w=2048&h=1536)

**ダイエー三軒茶屋店 (イオンフードスタイル)** に来ました。

さて、**クリアファイル**はあるのでしょうか……？

<div style="height: 30vh"></div>

![](/blog/bocchi-the-cycling/IMG_1830.jpg?w=4032&h=3024)

**ですよね〜〜〜〜**、次行きます。

<div class="time-limit">予約解除まで残り <span class="time-limit-counter">21</span> 分</div>

![](/blog/bocchi-the-cycling/C27C8E12-82F3-40AD-8440-877B9525C795_1_102_o.jpg?w=2048&h=1536)

戻ります。時間はまあ、余裕そうです。

<div class="time-limit">予約解除まで残り <span class="time-limit-counter">19</span> 分</div>

![](/blog/bocchi-the-cycling/E68D9248-F402-4D5D-AE4B-480D27F826A0_1_102_o.jpg?w=2048&h=1536)

駅前まで戻ってきました。

次のステーションのさいとうビルは確かこのあたりなので、地図を見ながらゆっくり探そうと思います。

## 1st Ride: さいとうビル (三軒茶屋付近)

![](/blog/bocchi-the-cycling/1DA7759D-42A5-4C1C-9984-D8761D687C3A_1_102_o.jpg?w=2048&h=1536)

時間内にステーションに戻ってこれました。あっさり、という感じです。

そんなわけで今度こそ、**パンクしていないことも確認**し、自転車で移動しようと思います。

```use-defined-component
use: start-rental
times: 1st
station: さいとうビル (三軒茶屋付近)
start: 12:13
```

```use-defined-component
use: time-limit
start: 12:13
current: 12:13
```

```next-page
Ride on...
```

<!-- page break -->

ここでもう一度今回のルールを確認しておきます。

```titled-frame
ルール

<div class="bicycle-itemize">

- レンタサイクルは**各回 30 分以内に返却**し、間に合わなかった場合もできるだけ早く最寄りのステーションに返却する (30分以降は 15分ごとに 100 円かかる！)
- **同じステーションは2度使用しない** (貸し借りを同じステーションで行わない)

</div>

```

ということで走っていきましょう。

<div class="time-limit">返却予定時刻まで残り <span class="time-limit-counter">23</span> 分</div>

![](/blog/bocchi-the-cycling/FCCD53E8-8100-457B-8EBD-5A11880F2174_1_102_o.jpg?w=2048&h=1536)

さて、デカい道を進んでいきます。自転車通行可ではなさそうな感じがしたのでこのあと仕方なく車道に降りたのですが、**路駐多すぎ**、**車ビュンビュン走りすぎ** で最悪でした。

<div class="time-limit">返却予定時刻まで残り <span class="time-limit-counter">19</span> 分</div>

![](/blog/bocchi-the-cycling/68FB8C78-3E01-40FA-AD75-B83B9FE7F0AA_1_102_o.jpg?w=2048&h=1536)

最悪なので住宅街に逃げます。あんな道走ってられませんからね。

ところで電動自転車に乗るのは2回目 <small>(1回目は一昨日、クリアファイルを探しに調布→稲城長沼に行った)</small> なのですがあまり速度出ませんね。リミッターがかかっているのか？と思うくらい速度に上限があるように感じます。まあ、勝手に安全運転になってくれるので良いのですが……。

と思って調べたのですが本当にリミッターついてるんですね、電動の補助機能のリミットが法律で定められているらしい。

でも速度が固定されているメリットもあって、たぶんこの先到着予定時刻の見積もりが簡単になるはずです。

![](/blog/bocchi-the-cycling/E3B384E8-1A7C-4280-825F-197E98C583E3_1_102_o.jpg?w=2048&h=1536)

進みます。意外と時の進みが早くて驚きます。

ところで自転車ブログ書くのめちゃ大変じゃないですか？**ちょっと走って、止まって、写真撮って、ちょっと走って、止まって、写真撮って、ちょっと走って、止まって、写真撮って……** を繰り返すの苦痛すぎる、もう眼球がカメラになってくれんかな

## 12:31 🚲 駒沢オリンピック公園

<div class="time-limit">返却予定時刻まで残り <span class="time-limit-counter">11</span> 分</div>

![](/blog/bocchi-the-cycling/934B7C69-1907-4C1F-8268-70C07298F3BE_1_102_o.jpg?w=2048&h=1536)

**駒沢オリンピック公園** にやってきました。そろそろ時間もヤバいのでステーションを見つけたいところです。確かこの公園には 3 つくらいステーションがあるはずです。

![](/blog/bocchi-the-cycling/2B94D23A-32D9-4A5E-89EE-4DC24D544AA6_1_102_o.jpg?w=2048&h=1536)

公園の中に入ってみると**サイクリングコース**が出現しました。楽しそうです。走ってみましょう！

途中、駐輪場みたいな場所をいくつか見つけたのですが、どれもレンタサイクルのステーションではないらしく困りました。

<div class="time-limit">返却予定時刻まで残り <span class="time-limit-counter">7</span> 分</div>

![](/blog/bocchi-the-cycling/D456B081-DB40-4180-AEF6-8649813A8CC0_1_102_o.jpg?w=2048&h=1536 "自転車専用の橋")

そろそろ時間がなくなってきました。流石にこの橋の先には駐輪場があるだろうと思われるので**急ぎます**。
なんたってサイクリングコースですからね、多少速度を出しても文句は言われないでしょう。**しまった！この自転車速度出ないんだった！**

<div class="time-limit">返却予定時刻まで残り <span class="time-limit-counter">5</span> 分</div>

![](/blog/bocchi-the-cycling/E7161B22-955F-4DC9-88FF-A50592E0BDFA_1_201_a.jpg?w=1179&h=814)

「橋は渡ったぞ、ステーションはどこだ！？」と地図を見たところ、**通り過ぎている**ことが分かりました。**何ィ！？**

しかもサイクリングコースを走ってきたことが仇となり、<b>「逆走禁止」</b>のサイクリングコースのルールにより簡単には戻れません。なんてこった！

どうしようか悩んでいると**園外へと通ずる道**が目に飛び込んできました。**これなら行ける！！！！！**

![](/blog/bocchi-the-cycling/olympic-park-map.png?w=2502&h=2332)

もう普通に急いでたのでこれ以降写真は撮っていません。

## 13:41 🚲 駒沢オリンピック公園きりんさんパーキング

![](/blog/bocchi-the-cycling/8A016C66-F9F9-41EF-A5F8-C4F531F6B705_1_102_o.jpg?w=2048&h=1536)

```use-defined-component
use: finish-rental
times: 1st
station: 駒沢オリンピック公園きりんさんパーキング
start: 12:13
finish: 12:41
total-price: 130
```

なんとか、無事30分以内の返却に成功しました！**危なかった〜〜〜**、大変でした。
次はもう少し時間に余裕を持った返却場所を選びたいですね。

![](/blog/bocchi-the-cycling/9AFDD493-2C48-404E-94FC-7B750F0A1A09_1_102_o.jpg?w=1179&h=2556)

ここは一応国立公園なので、オタクのよくやっているスタンプラリーも埋めておきます。

![](/blog/bocchi-the-cycling/3FFD4050-8497-4D76-B3EE-D124B188BD36_1_102_o.jpg?w=2048&h=1536)

ここは広い公園で気持ちが良いです。

さて、次のステーションは先ほどと同じく駒沢オリンピック公園の園内にあるステーションです。園内を散歩しながら向かって行きましょう。

![](/blog/bocchi-the-cycling/E8BFE7C4-765A-4D35-B145-CEDBCB80400F_1_201_a.jpg?w=3960&h=2970)

さすがオリンピック公園といった感じで、**運動をしている人がめちゃくちゃ多い**です。
複数人で球技をしている高校生・大学生くらいの集団はワラワラいますし、少人数でもなんらかの練習、なんらかのトレーニングをしている人々が目立ちます。年齢問わず運動していて、高齢の方が**柵に捕まって腕立てをしていたり**なんかもしました。

![](/blog/bocchi-the-cycling/427E275F-7C7F-444C-819D-80F3DCAFA663_1_105_c.jpg?w=1024&h=768)

全員が運動している怖い環境でした。誰か一人くらいレジャーシート広げてお弁当食べてても良いだろ (探せばいたかもしれないが)

![](/blog/bocchi-the-cycling/AD2C077F-12A1-4256-BE25-3EEE45675107_1_105_c.jpg?w=1024&h=768 "駐車場みたいな歩行者用スロープ")


## 2nd Ride: 駒沢オリンピック公園サービスセンター駐輪場

![](/blog/bocchi-the-cycling/74EC25D9-3B50-4F31-A847-32C8F160D1CD_1_105_c.jpg?w=1024&h=768 "職員専用駐輪場")

スロープを降りると職員専用駐輪場に紛れてレンタサイクル置き場がありました。

![](/blog/bocchi-the-cycling/D6D03F52-B1A1-42A5-BEED-788447715896_1_105_c.jpg?w=1024&h=768 "かっこいい自転車")

ママチャリではない**かっこいい自転車**がありました。これに乗ってみたいですね！

![](/blog/bocchi-the-cycling/21380360-4918-4696-A28D-677A33390BD9_1_201_a.jpg?w=1179&h=1147)

> 300円/30分まで <small>(+150円/15分)</small>

**やめます。**

かっこいい自転車は高いので、先ほどと同じく奥のママチャリを使いたいと思います。**レンタル開始！**

```use-defined-component
use: start-rental
start: 12:54
station: 駒沢オリンピック公園サービスセンター駐輪場
times: 2nd
```

```use-defined-component
use: time-limit
start: 12:54
current: 12:54
```

![](/blog/bocchi-the-cycling/90785911-9D9D-42CF-BD98-966BD6A6DE36_1_105_c.jpg?w=1024&h=768)

2回目のライドが始まりました。

![](/blog/bocchi-the-cycling/IMG_117B77E8B0C6-1.jpg?w=1225&h=1384)

今回は多摩川駅の方を目指そうと思います。
**調布駅の隣の京王多摩川ではなく、田園調布駅の隣の多摩川駅**です。ややこしいですね。

地図アプリでは**自転車でだいたい20分くらい**と書かれているので余裕でしょう！
多摩川駅まで走っていきましょう。

![](/blog/bocchi-the-cycling/AE00C670-FD05-41C5-B056-6FB5FEC9EE15_1_105_c.jpg?w=1024&h=768 "IPPUDO")

![](/blog/bocchi-the-cycling/D1E1DCC5-3F43-4607-A870-72CAF8A0628D_1_105_c.jpg?w=1024&h=768)

進みます。

```use-defined-component
use: time-limit
start: 12:54
current: 13:03
```


![](/blog/bocchi-the-cycling/F4EC45DE-9808-476C-A706-04AE89C4B9D9_1_105_c.jpg?w=1024&h=768 "公園あり")

![](/blog/bocchi-the-cycling/A123AA93-D4D8-4DE6-A572-39B7A3C328BF_1_201_a.jpg?w=2609&h=1957 "突然道が細くなる")

```use-defined-component
use: time-limit
start: 12:54
current: 13:10
```

![](/blog/bocchi-the-cycling/F13078D1-7105-46A6-9736-D7179833711D_1_105_c.jpg?w=1024&h=768)

「進みます」くらいしか言うことがありません。
止まりながら写真撮るのは面倒すぎるし、せっかく撮ってもほとんど使い所がないし……しんどくなってきています。

もしかして自転車に乗るのってやめた方が良いですか？

![](/blog/bocchi-the-cycling/008952E5-6D04-4A67-9C78-90D125C04416_1_201_a.jpg?w=3361&h=2520 "自転車侵入禁止")

**やっぱり徒歩の方が良いらしいです。**

![](/blog/bocchi-the-cycling/1B92C17E-FBBB-4B33-BBBC-4F15E87713F7_1_201_a.jpg?w=2000&h=769 "直進しても左折しても踏切に引っかかる")


```use-defined-component
use: time-limit
start: 12:54
current: 13:16
```

![](/blog/bocchi-the-cycling/IMG_1891.jpg?w=1178&h=1416)

```centering-with-size-bold
1.5em
全然進んでない！！！！！
```

残り8分だと言うのに、多摩川駅までの道のりの半分くらいしか進んでいません。**まずい！！！！！！！**

立ち止まって写真を撮ったり、地図を頻繁に確認していたりしたせいで完全に予定が狂いました。
このままのペースでは確実に多摩川駅近くのステーションに着くことはできません。

ここでルールをおさらいしましょう。

```titled-frame
ルール

<div class="bicycle-itemize">

- レンタサイクルは**各回 30 分以内に返却**し、間に合わなかった場合もできるだけ早く最寄りのステーションに返却する (30分以降は 15分ごとに 100 円かかる！)
- **同じステーションは2度使用しない** (貸し借りを同じステーションで行わない)

</div>

```

これが意味するのは「時間切れになったときの**最寄りのステーションが孤立**していた場合、**遠く離れた別のステーションまで歩かないといけない**」ということです。なので変な場所で時間切れを迎えるわけにはいきません！！！！！

![](/blog/bocchi-the-cycling/cycle.png?w=2190&h=898 "(2) 同じステーションは2度使用しない")

<b>「徒歩で長距離移動するのはネアンデルタール人のような判断」</b>とジョー・バイデンが[言っている](https://www.afpbb.com/articles/-/3334768) (フェイクニュース) ように、できるだけ歩く距離は減らしたいです。ですから、**返却するステーションと新しく自転車を借りるステーションは近ければ近いほど嬉しい**です。

![](/blog/bocchi-the-cycling/IMG_459F6C30B48E-1.jpg?w=920&h=1071)

そういうわけで、若干遠回りになってしまいますが**2つのステーションが近接している地点**を目指します。

これ以降も歩行距離を減らすため、「2つのステーションが近接している場所」を目指すようにルート設計をしていきます。**めんどくせえ！**

今気づいたのですが多摩川駅のステーションは孤立しているので、ここで自転車を返却した場合**歩いて多摩川を渡る羽目になっていた**らしいです。災い転じてチャリとなす……(？)

![](/blog/bocchi-the-cycling/BAB91A70-C238-448A-BA9E-DE74CE4AE340_1_201_a.jpg?w=3675&h=2756)

急ぎます。

![](/blog/bocchi-the-cycling/501B48B6-E3F2-4E75-AAB3-EC7D4638694F_1_201_a.jpg?w=3024&h=2268 "あんかKさんの親戚 <small>(よく見たら有名人からお祝いが来ているな……)</small>")

![](/blog/bocchi-the-cycling/0FDA2687-C4CB-4C68-80E3-64C8B93474DD_1_105_c.jpg?w=1024&h=768 "デカい下り坂")

このあたりは結構なアップダウンがあります。電動自転車じゃなければキレていました。

![](/blog/bocchi-the-cycling/6FD06822-B31C-4953-B2E9-D93E1C2EA741_1_105_c.jpg?w=1024&h=768)

## 13:30 🚲 ファミリーマート 世田谷玉堤店

![](/blog/bocchi-the-cycling/E50DD8EC-E83E-42EC-91B9-7DE935B2C8B8_1_105_c.jpg?w=1024&h=768)


```use-defined-component
use: finish-rental
times: 2nd
start: 12:54
finish: 13:30
station: ファミリーマート 世田谷玉堤店
total-price: 360
```

**6分超過**で返却しました。悔しい！！！！！2回目にして既に敗北しています。

- きちんとルート設計をする
- 写真は撮り過ぎない
- ステーションの密集している場所を選んで通る

などの教訓が得られました。これを活かして次回以降は30分を超えないように返却したいところです……**しかも30分超えると+100円されますからね！！！！！！！！！！！**

ノルマ達成できないと100円のペナルティ (※) が発生するあたり、ちょうど良いゲーム性で面白いので皆さんもやってみてください♪

<small>※勝手にペナルティと言っているが、実際は15分ごとの延長料金であってペナルティではない</small>

![](/blog/bocchi-the-cycling/B5678185-32C0-485F-B10F-4AAB29A85F25_1_105_c.jpg?w=1024&h=768)

次に自転車を借りるステーションは奥に見えるローソンです。**近い！**
これにはジョー・バイデンもにっこり


![](/blog/bocchi-the-cycling/DB48636B-247E-4DAC-9FD9-7AB547B69B1D_1_105_c.jpg?w=1024&h=768 "なんかいい路地bot")


## 3rd Ride: ローソン 世田谷玉堤一丁目店

![](/blog/bocchi-the-cycling/199B9645-3BBC-471A-AE2E-BC8A61CB7EDE_1_201_a.jpg?w=4032&h=3024)

30円引きのLチキが売っていたのでエネルギー補給をします。お腹も空いていたし、**100円のペナルティも食らったばかり**なので助かります。

ローソンの自分で取るタイプのホットスナック、大抵冷めているイメージだったのですが、ここの店舗のは普通にアツアツで良かったです。作りたてだったのか……？作りたてで30円引きするな

![](/blog/bocchi-the-cycling/D8A3C0F2-E283-4C68-9F70-42A17366E377_1_105_c.jpg?w=1024&h=768)

エネルギー補給も済んだので、自転車に乗って次の場所へ向かいましょう！

```use-defined-component
use: start-rental
times: 3rd
start: 13:46
station: ローソン 世田谷玉堤一丁目店
```

```use-defined-component
use: time-limit
start: 13:46
current: 13:46
```

![](/blog/bocchi-the-cycling/IMG_26C097DD9D29-1.jpg?w=1082&h=1395)

さて3回目のライドが始まりました。今回は武蔵小杉駅と元住吉駅の間の**中原平和公園**を目指します。
このあたりは**そこそこステーションが密集している**こともありますし、そもそも Google マップは「20分で着く」と言っているので絶対間に合うでしょう。**でも前回も20分で着くって言ってなかったか……？**

写真を撮るペースを落として急げば大丈夫！そういうことにしておきます。

```use-defined-component
use: time-limit
start: 13:46
current: 13:48
```

![](/blog/bocchi-the-cycling/FF75FED8-CF1F-498C-92C1-AD8F17F6689E_1_105_c.jpg?w=1024&h=768)

多摩川に出ました。ここは数年前に[調布から羽田空港まで歩く会](/blog/haneda-walking)で通った道です。懐かしいですね。

![](/blog/bocchi-the-cycling/3DDAA714-8784-4156-BA49-C7CD646D00DF_1_201_a.jpg?w=3105&h=2329 "そのときもこんな感じの景色を見ましたな")

![](/blog/bocchi-the-cycling/EFCA7392-9C62-4E14-8E26-EFCE28A906AE_1_105_c.jpg?w=1024&h=768)

盛り上がっている道路で川は見えませんが、川沿いを走っていきます。

![](/blog/bocchi-the-cycling/852C75A8-65FE-400B-92D8-BC2E4D1075A9_1_105_c.jpg?w=1024&h=768)

## 14:00 🚲 丸子橋

```use-defined-component
use: time-limit
start: 13:46
current: 14:00
```
![](/blog/bocchi-the-cycling/6E1D8C6F-72F8-4859-A992-F7D0BCE69BA0_1_105_c.jpg?w=1024&h=768)

多摩川駅のすぐそばの橋、**丸子橋**に来ました。ここから多摩川を渡ってそのまま道なりに進み、中原平和公園に向かいます。

```twitter-archived
id: 1733716241301582117
name: 淵野アタリ
userid: ebioishii_u
date: 2023-12-10
tweet: <b>不思議な形の足をしてますね、サイボーグ？</b>
```

**今日は自転車なんだって！！！！！！！！！！！**

```use-defined-component
use: time-limit
start: 13:46
current: 14:03
```

![](/blog/bocchi-the-cycling/28BA9058-A9DC-4C38-9E6B-67EAF6C4C91D_1_105_c.jpg?w=1024&h=768)

進みます。

![](/blog/bocchi-the-cycling/004F91EC-7CBF-4E87-8215-CD62B75CE18D_1_105_c.jpg?w=1024&h=768)

このあたりは三軒茶屋周辺と違って歩道が自転車通行可になっています。走りやすくてありがたいです。
でもまあ、どこでも走れる徒歩の方が万能だよなあ、と改めて思い知らされています。

```use-defined-component
use: time-limit
start: 13:46
current: 14:11
```

![](/blog/bocchi-the-cycling/IMG_1925.jpg?w=1178&h=1179)

さて、**またしても時間が足りなくなってきました**。学習しろ！

**中原平和公園はギリギリ間に合わなそう**という時間になってきています。ここは一旦公園の方を諦めて、**セブンイレブンの方へ向かう**ことにします。微々たる差のようにも思えますが、1秒の差が100円のペナルティの付く付かないを分けてしまいます。

```use-defined-component
use: time-limit
start: 13:46
current: 14:13
```

```horizontal-images
![](/blog/bocchi-the-cycling/C3C07BAE-2DEF-4D06-9CDD-5F502B81684E_1_105_c.jpg?w=1024&h=768)
![](/blog/bocchi-the-cycling/7B16C0CB-4418-4AC2-BFF7-B2CE5114D0BA_1_201_a.jpg?w=925&h=694)
```

```centering-with-size-bold
1.7em
おい！！！！この信号変わらないんだけど！！！！！！
```

残り3分だってのにいつまでも信号が変わりません。**キレそう！！！！！！**

実はここまでの道のり、すべての信号で赤信号にひっかかっています。この流れだったので「知ってた！！！」という感じではありますが、ここまで徹底するんだという感じです。許せね〜〜〜


## 14:18 🚲 セブンイレブン 川崎市ノ坪⻄店

![](/blog/bocchi-the-cycling/70AB0683-7796-4740-B6BB-1FBCE2C93461_1_105_c.jpg?w=1024&h=768)

```use-defined-component
use: finish-rental
times: 3rd
start: 13:46
finish: 14:18
station: セブンイレブン 川崎市ノ坪⻄店
total-price: 590
```

結局今回も超過してしまいました。**2連続で敗北**しています。

実は信号が青に変わったあとも**ステーションの場所が分からず迷いまくってたのでどっちにしろ死んでいた**という感じです。
もっと近い場所を目的地に設定しようね。

```twitter-archived
id: 1733718361870315924
date: 2023-12-10
tweet: 今日のレギュレーションは<br><br>- 自転車は30分以内に返却する<br>- 同じステーションで自転車を乗り換えない<br><br>です。<b>今のところ2回時間制限守れなくてレンタサイクル会社に罰金を支払っています。</b>
```

ところでこの記事の冒頭ではこんなことを言っていました。

> Google マップも**3時間**で着くと言っています。いや〜〜〜〜〜流石に目標設定間違えましたね！このままいけば「苦行」でなくなるので困っちゃいますね！

それとこちらの地図をご覧ください。

![](/blog/bocchi-the-cycling/42map13.jpg?w=1419&h=1846)

11時に開始してから**3時間**が経過していますが、**未だ 1/3 も進んでいません。**
**あと 6 時間以上かかる！？！？！？** 絶望してきました。**自転車だからと完全に舐めていました。**

よく考えてみれば

- よく写真を撮る
- 30分で自転車は降りる (1回しかできてないけど)
- ステーション間の移動は徒歩
- 次に向かうステーションは戦略を練って決める必要がある
- そもそも Google マップの出してくる到着予想時間が短すぎる

といういくつもの遅延要因があり、**到底 3 時間で終わるわけがありませんでした**。終わっています。

「このままいけば「苦行」でなくなるので困っちゃいますね！」と言ってたのも過去の話……**今この瞬間、苦行が始まったのです。**

## 14:21 🚶 中原平和公園へ向かう

![](/blog/bocchi-the-cycling/musko.jpg?w=970&h=1469 "スクリーンショットは後日撮影したもの")

次のステーションへはそこそこ離れていますが仕方ありません。**歩きます。**

どうせ30分超過するのならば最初から平和公園の方に行くべきでした。悔し〜〜〜〜

![](/blog/bocchi-the-cycling/8920F224-E73F-4E5F-8C71-90CC1C9E30D4_1_105_c.jpg?w=1024&h=768)

![](/blog/bocchi-the-cycling/E28618FE-5271-4591-BA2C-A3BF5DB70B9F_1_105_c.jpg?w=1024&h=768 "こういうトンネル好き")

![](/blog/bocchi-the-cycling/BC92A1AA-228A-44CD-8BEB-3C89FC1F78FB_1_105_c.jpg?w=1024&h=768 "橋のすぐ下を通る川")

![](/blog/bocchi-the-cycling/756A021C-BA06-4431-8CC0-0D7A047C27C8_1_105_c.jpg?w=1024&h=768)

遊歩道を歩いていきます。一人だとやることもなくて虚無です。

![](/blog/bocchi-the-cycling/A801C54D-257D-40DC-B585-CC36E60F890F_1_105_c.jpg?w=1024&h=768)

そういえばこの企画をやる前、きゅ〜さんに<b>「一人で歩くことも苦行ですよ」</b>と言われたのを思い出しました。確かにそうですけど、一人だと書くこともないので**読者も私も両方虚無**という誰も得しない状況になっています。

![](/blog/bocchi-the-cycling/F306B535-E8BF-427B-BA5E-6FCB28F1D504_1_105_c.jpg?w=1024&h=768)

なんでこんなことに貴重な休日を溶かしてるんだろう……

![](/blog/bocchi-the-cycling/472B6FBB-D733-487D-AD1E-59098234C6E1_1_105_c.jpg?w=1024&h=768)

「紅葉見に行こうよう！」ということかもしれません。

![](/blog/bocchi-the-cycling/50DBE6D3-F35F-46CB-BA90-1351BA1BBAA6_1_105_c.jpg?w=1024&h=768)

やっと<ruby><rb>歩道橋</rb><rp>（</rp><rt>面白いもの</rt><rp>）</rp></ruby>が出てきました。**ハッピ〜〜〜〜**

![](/blog/bocchi-the-cycling/52C7C880-2CD0-468D-937F-AF32F51F857E_1_105_c.jpg?w=1024&h=768)

![](/blog/bocchi-the-cycling/B76235AC-3FCB-4C0B-9230-7DC2D3B31BE8_1_105_c.jpg?w=1024&h=768)

```next-page
そしてまた自転車に……
```

<!-- page break -->

## 4th Ride: 川崎市中原平和公園1

![](/blog/bocchi-the-cycling/551E66C8-B173-4D7A-818C-77A14F2F9693_1_105_c.jpg?w=1024&h=768)

来ました。来なくていいよ……もう徒歩もしたくないし、自転車にも乗りたくないです。
特に自転車は**乗った瞬間 30 分のタイマーがスタートする**ので徒歩と違ったプレッシャーがのしかかります。
こんなことやっても良いことないからやめた方が良いですよ。

![](/blog/bocchi-the-cycling/09843E34-22BF-49E7-8352-59165AF55EEB_1_105_c.jpg?w=1024&h=768)

そんなことを言っててもこの企画から逃れられるわけではないので乗ります。

```use-defined-component
use: start-rental
times: 4th
start: 14:35
station: 川崎市中原平和公園1
```

```use-defined-component
use: time-limit
start: 14:35
current: 14:35
```

![](/blog/bocchi-the-cycling/IMG_808755033A7E-1.jpg?w=912&h=1382)

こんな感じで行きます。また「20 分かかる」らしいですが、今回は川沿いを走るので流石に間に合うと思います。

![](/blog/bocchi-the-cycling/58736A81-EFFA-4516-84C5-1B5F835E34F1_1_105_c.jpg?w=1024&h=768)

そういえば目的地への道案内には Apple マップを使って Apple Watch に地図を出させています。
iPhone を出さなくてもすぐ確認できるのでめちゃ便利です。苦しみを減らす機能も実装して欲しいです。

```use-defined-component
use: time-limit
start: 14:35
current: 14:38
```


![](/blog/bocchi-the-cycling/F454255B-6217-4F8B-B78F-5E9B7F92BADA_1_105_c.jpg?w=1024&h=768)

ここから川沿いを走っていきます。信号がないのでスムーズに走れるはずです。

![](/blog/bocchi-the-cycling/29983DAB-5A50-4A2E-9F53-BB393263BC4D_1_105_c.jpg?w=1024&h=768 "「二手に分かれましょう！(幻聴)」")

```use-defined-component
use: time-limit
start: 14:35
current: 14:48
```

![](/blog/bocchi-the-cycling/4D435E3C-D926-4695-BD7C-C676874F64C1_1_105_c.jpg?w=1024&h=768 "走りやすい道")

ずっと街中を走っていたので、こういう道が出てくると嬉しくなりますね。走りやすいです。

![](/blog/bocchi-the-cycling/5E266194-5473-4037-9C44-3035382B979C_1_105_c.jpg?w=1024&h=768)

せっかく走りやすい道なのですが、自転車がハズレで**ガコンガコン**と大きな音を立てながら走っています。**最悪**、さっさと返却したいです。

```use-defined-component
use: time-limit
start: 14:35
current: 14:55
```

![](/blog/bocchi-the-cycling/DA9C66AF-BF09-4065-AC2B-DBA09BE2150C_1_105_c.jpg?w=1024&h=768)

大きめの川に出ました。**鶴見川**のようです。

![](/blog/bocchi-the-cycling/40E82B83-6C79-439A-A122-3D1CD76AA367_1_105_c.jpg?w=1024&h=768)

日がだいぶ沈んできています。私は金沢八景に着けるのでしょうか……

## 15:02 🚲 ローソン 横浜樽町三丁目店

```use-defined-component
use: time-limit
start: 14:35
current: 15:02
```

![](/blog/bocchi-the-cycling/5BB22338-5641-4B7E-951D-131FB46B5043_1_201_a.jpg?w=4032&h=3024)

ステーションに着きました。**返却！返却！**

```conversation
私: 返却します！！！！(自転車の返却ボタンを押す)
自転車: (ランプが赤く光る)
私: おい！<b>返却完了にならねえ！</b>何！？アプリで返却します！
アプリ: **通信エラーです**
私: **おい！！！！！！！！！！！！！！**
```

**せっかく3分前に着いたのに！！！！！** おいおいおいおい

祈りながらアプリの再起動を繰り返します。

```use-defined-component
use: time-limit
start: 14:35
current: 15:03
```

アプリの再起動を繰り返したり、**スマホを空中でブンブン振ったり**しているとようやく……

```use-defined-component
use: finish-rental
times: 4th
start: 14:35
finish: 15:03
station: ローソン 横浜樽町三丁目店
total-price: 720
```

なんとか返却できました。今回こそ間に合いました。**あぶね〜〜〜〜〜**

私のドコモ回線が重いのか、HELLO CYCLING のアプリがしんどいのか分かりませんが、本当にヒヤヒヤするのでやめてほしいです。

HELLO CYCLING のアプリ、返却予約のロードが異常に遅かったり、ところどころ動作が怪しいのでエンジニアの人なんとかしてくださいという気持ちです。多少値上げしても良いからまともに動くものを作ってくれ……😭 **(この前それで電車乗り損ねて研究室のゼミに遅刻しかけたので)**(ギリギリで行動するな)

![](/blog/bocchi-the-cycling/1C445858-2F7F-4AD9-88A9-11C860365DB7_1_105_c.jpg?w=1024&h=768)

ということでローソンを後にします。次行くぞ！

![](/blog/bocchi-the-cycling/ED87C6D0-7BAE-42D9-8EA5-E1DAB1881E24_1_105_c.jpg?w=1024&h=768 "🐸")

## 15:06 🚶 イオン駒岡店

![](/blog/bocchi-the-cycling/012D3591-4A94-4FD4-B289-CACD50E1B774_1_105_c.jpg?w=1024&h=768)

お久しぶりです、イオン巡りのお時間です。**響け！ユーフォニアムコラボクリアファイルの回収**にやってきました。

アイスコーナーに行き、クリアファイルがぶら下がっているかを確認します。
**このへんにオタクが住んでいなければ**残っているはずですが果たして……

<div style="height: 30vh"></div>

![](/blog/bocchi-the-cycling/IMG_1972.jpg?w=4032&h=3024)

**ダメでした……**。やはりオタクはどこにでも存在しているようです。**悔しい〜〜〜！！！**

また次回のイオン巡りの回でお会いしましょう。

![](/blog/bocchi-the-cycling/045D3E29-D082-49FC-AE60-E751840219FC_1_105_c.jpg?w=1024&h=768 "モグラの石像")

## 5th Ride: 綱島温泉 湯けむりの庄

![](/blog/bocchi-the-cycling/6D12C5BD-EF4A-4027-AE98-E47379EFD87F_1_105_c.jpg?w=1024&h=768)


**綱島温泉 湯けむりの庄**に来ました。といっても例のごとく自転車を借りに来ただけです。

ここには自転車が**2台**しか停まっておらず、しかも片方は**例のかっこいい自転車**でしたので危なく自転車を借りられないところでした。安い自転車が残っていて良かったです。

それでは5回目のライドを始めていきましょう。

```use-defined-component
use: start-rental
times: 5th
start: 15:19
station: 綱島温泉 湯けむりの庄
```

```use-defined-component
use: time-limit
start: 15:19
current: 15:19
```

![](/blog/bocchi-the-cycling/IMG_0560.jpg?w=1383&h=1175)

今回は**新横浜駅**を目指します。地図アプリは今回も「20分」で着くと言っていますが、まあ今回も川沿いを通るので間に合うでしょう。若干このルートは遠回りですが、市街地はどんなトラブルが待ち構えているか分からない **(信号とか、信号とか、信号とか)** のでこちらのルートの方が安全でしょう。

![](/blog/bocchi-the-cycling/D93FD425-B65C-4152-B828-855F634A1669_1_105_c.jpg?w=1024&h=768)

川の方へ向かって走っていきます。

```use-defined-component
use: time-limit
start: 15:19
current: 15:26
```

![](/blog/bocchi-the-cycling/E9FDC1EA-A703-4AC2-AF67-5244190E93CF_1_105_c.jpg?w=1024&h=768)

川沿いの道に出ました。ここからは走りやすいコースなので安心です。電動アシストのパワーも借りて、**スイスイ**走っていきます。

**スイスイ………**

………

![](/blog/bocchi-the-cycling/BAFC0275-7C4F-4455-9E9A-F468C93FBAB4_1_105_c.jpg?w=1024&h=768)

<p style="font-size: 1.7em; text-align: center; letter-spacing: 0.7em; font-weight: bold">
バッテリー0%
</p>

**嘘だよな……？**

スイスイ楽しいはずの川沿いコースが今この瞬間、<span style="font-size: 1.5em">**重い自転車と共に走る苦行コースと化しました**。
<span style="color: red">***苦行チャンス！！！！！！！！！！！！！！！！！！***</span>

</span>

**バカがよ〜〜〜〜〜〜〜〜**


![](/blog/bocchi-the-cycling/21380360-4918-4696-A28D-677A33390BD9_1_201_a.jpg?w=1179&h=1147 "バッテリーがカスな自転車の例")

アプリではバッテリー残量が確認できるので、**バッテリーがカスの自転車**は選ばないようにしましょう。**(1敗)**

```use-defined-component
use: time-limit
start: 15:19
current: 15:29
```

![](/blog/bocchi-the-cycling/4350100E-7C65-4876-B06C-656A6E5F8C62_1_105_c.jpg?w=1024&h=768)

教習所がありました。

![](/blog/bocchi-the-cycling/copilot-driving-school.png?w=1484&h=342)

GitHub Copilot にバカにされています。

![](/blog/bocchi-the-cycling/21570BA6-590D-4E9B-B40E-F25DB386843C_1_105_c.jpg?w=1024&h=768 "2階建てバス")

**2階建てバス**がありました。これ教習車！？送迎バスかもしれません。送迎バスだとしてもだいぶ珍しいですね……

```link-embed
https://www.koyama.co.jp/yokohama/
```

サイトを見た感じ**そういうオブジェ**っぽさがあります。流石にそうか……

```use-defined-component
use: time-limit
start: 15:19
current: 15:33
```


![](/blog/bocchi-the-cycling/5C508CB2-4B61-46FA-83B4-A66D3B0209C8_1_105_c.jpg?w=1024&h=768)

進みます。

![](/blog/bocchi-the-cycling/FDFCE298-E7D9-4779-B058-B98771E04476_1_201_a.jpg?w=3703&h=2777)

自然の中を走っていると突如**大きな建物が密集している場所**が現れました。
いきなり異質なものが出てきた感じで面白いです。

![](/blog/bocchi-the-cycling/B5DA082D-CE03-4521-AD43-1F147A14248D_1_105_c.jpg?w=1024&h=768)

まわりの風景はこんな感じです。

![](/blog/bocchi-the-cycling/D9D430A2-0C9C-4532-AF34-524592030DD2_1_105_c.jpg?w=1024&h=768 "そり立つ壁 (SASUKE 1st Stage)")

```use-defined-component
use: time-limit
start: 15:19
current: 15:45
```

![](/blog/bocchi-the-cycling/F332323B-1727-453B-B3E9-7D207094F1ED_1_201_a.jpg?w=3859&h=2894)

川沿いのコースを抜け、**新横浜のビル群**に出ました。

目的のステーションまでは残り**800m**、残り時間は**4分**です。信号待ちがあることを考えると間に合うか、間に合わないかの瀬戸際です。**さて、どうする……！**

![](/blog/bocchi-the-cycling/B8A94DE2-F561-45DB-AAA8-C2FAA72ABC19_1_105_c.jpg?w=1024&h=768)

```centering-with-size-bold
1.7em
おや？
```

## 15:47 🚲 ファミリーマート 新横浜三丁目店

![](/blog/bocchi-the-cycling/EA055CF4-EC4F-4EA8-A739-D5775C8D119B_1_105_c.jpg?w=1024&h=768)

```use-defined-component
use: finish-rental
times: 5th
start: 15:19
finish: 15:47
station: ファミリーマート 新横浜三丁目店
total-price: 850
```

なんと、**目の前にステーションが現れた**のでギリギリ間に合いました。**神！！！** ありがとう〜〜〜〜

ちなみに2回の信号待ちでかなりギリギリになりました。危なすぎる、やはり信号のある市街地は時間がかかるということを認識しておいた方が良さそうです。

---



![](/blog/bocchi-the-cycling/23A0AB58-D8A9-491F-9A3D-C76683EE43E3_1_201_a.jpg?w=4032&h=3024)

しばらく何も食べていなかったので一旦休憩します。ファミマで色々買ってきました。

![](/blog/bocchi-the-cycling/LINE_capture_725045974-434470.jpg?w=786&h=1188)

徒歩部後援会 (？？？) の **[mato1370](https://twitter.com/mato1370) さんにギフト券をいただいた**のでこちらを使わせていただきました。いつもありがとうございます😭

![](/blog/bocchi-the-cycling/shinyokohamap.jpg?w=1179&h=1653)

食べる場所がないので、ステーションまでの移動も兼ねてひとまず**新横浜駅**まで歩きましょう。

![](/blog/bocchi-the-cycling/5C57A98B-F992-4207-96A3-0FC1834D0B5A_1_105_c.jpg?w=1024&h=768 "横浜アリーナ")

![](/blog/bocchi-the-cycling/F4818E64-88B9-49FB-B3BB-3A24C339DBDB_1_105_c.jpg?w=1024&h=768 "確かに横浜アリーナ行った全人類がトイレ借りにきたら嫌すぎる")

![](/blog/bocchi-the-cycling/4AD41E85-DD87-4472-BA25-F946F5E93563_1_105_c.jpg?w=1024&h=768)

歩道橋がありました。

![](/blog/bocchi-the-cycling/7173EE2F-C2D1-489B-9379-5D466D139C00_1_105_c.jpg?w=1024&h=768)

若干遠回りですが渡ります。**面白すぎ！**

![](/blog/bocchi-the-cycling/0F925D6C-280B-46CF-91B3-E410BF3056AB_1_105_c.jpg?w=1024&h=768)

```use-effect
const famima = document.getElementById('famima')
let interval = null;
let count = 0;

// viewport に入ったら実行開始
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    interval = setInterval(() => {
      count++;
      famima.insertAdjacentHTML('beforeend', '!')
      if (count >= 1200) clearInterval(interval);
    }, 10);
  }
});

observer.observe(famima);

return () => {
  observer.disconnect();
  clearInterval(interval);
  famima.innerHTML = 'ファミマ!!';
}
```

<p style="height: 200px; overflow-y: hidden; line-break: anywhere">
<span id="famima" style="font-weight: bold">ファミマ!!</span>がありました。
</p>

![](/blog/bocchi-the-cycling/D54EDD1F-141F-47AE-951F-3BC4707A25BE_1_105_c.jpg?w=1024&h=768)

円形の歩道橋がありましたが、残念ながら今は上れなさそうでした。残念だなあ😭

## 16:05 🚶 新横浜駅

![](/blog/bocchi-the-cycling/099395D5-1E7A-499C-B691-E8A1585BD1E6_1_201_a.jpg?w=3683&h=2762)

**新横浜駅**に到着しました。

![](/blog/bocchi-the-cycling/89550E6A-BC11-4BCD-BA43-BA6BEC4292A1_1_201_a.jpg?w=3411&h=2558)

良い感じのベンチがあったので休憩します。
まだ先は長いです。エネルギーを胃に突っ込みましょう。改めてmato1370さんありがとうございました😭

さて、現在地を確認します。

![](/blog/bocchi-the-cycling/42map-shinyoko.jpg?w=1419&h=1846)

```centering-with-size-bold
1.7em
開始から5時間でまだ半分
```

嫌になってきました。**最悪終電とバトルする**ことになるのを覚悟し始めました。いやいや、それは大袈裟でしょう……？


## 6th Ride: ファミリーマート 港北篠原町店

![](/blog/bocchi-the-cycling/72C08488-A31B-4BE8-8399-572EA1E1CD50_1_105_c.jpg?w=1024&h=768)

イヤイヤ言ってても終わりません。**走るしかないんです……。**

6回目のライドを始めていきましょう。

```use-defined-component
use: start-rental
times: 6th
start: 16:30
station: ファミリーマート 港北篠原町店
```

```use-defined-component
use: time-limit
start: 16:30
current: 16:30
```

![](/blog/bocchi-the-cycling/IMG_C3905C363C37-1.jpg?w=1382&h=1997)

今回はこんな感じで行きます。過去実績的に 5km なら余裕でしょう。

![](/blog/bocchi-the-cycling/952A2B11-EBA6-47D5-AA1E-F7A5DA5915A5_1_105_c.jpg?w=1024&h=768)

**開幕現れるデカい坂**、電チャリじゃなかったら許していません。
電動自転車なのでウキウキでのぼります。

![](/blog/bocchi-the-cycling/A4145222-965E-4D13-BBEC-0739B6A5D044_1_105_c.jpg?w=1024&h=768)

登り切るとこんな景色が見えます。下には駅のホームが見えて不思議な感じがします。ホームを駅の敷地外から見下ろすこと、あまり無くないですか？


![](/blog/bocchi-the-cycling/851EF4F8-69C4-49A8-9E7F-4CE6831F6FB3_1_201_a.jpg?w=2527&h=1895 "冷食の自販機")

```use-defined-component
use: time-limit
start: 16:30
current: 16:37
```

![](/blog/bocchi-the-cycling/2AE6ABFA-3A8D-4568-860F-D553AB23EDA9_1_201_a.jpg?w=4032&h=3024)

進みます。

自転車の記事を書くときは、赤信号のときに「進みます」写真を撮れば時間短縮できて良いということを学習してきました。と思ったのですが、**赤信号の写真と共に「進みます」と書くのはいろいろとマズい気がします**。

![](/blog/bocchi-the-cycling/88A0AE35-1EC3-4051-AB8C-868BA59C75C9_1_105_c.jpg?w=1024&h=768)

**進みません。**

## 16:40 岸根公園

```use-defined-component
use: time-limit
start: 16:30
current: 16:40
```

![](/blog/bocchi-the-cycling/C1822069-EBC1-4B87-AC9B-BAEBE6F81798_1_105_c.jpg?w=1024&h=768)

意外と良いペースで来ているのではないでしょうか。やはり無闇矢鱈に写真を撮るのはやめた方が良いですね。

![](/blog/bocchi-the-cycling/665E0E72-134D-45BC-B328-D0BC1E7B2F7E_1_105_c.jpg?w=1024&h=768)

本当はこの道も通りたかったのですが、自転車なので無理でした😭 
寄り道を楽しみたいなら、やはり自転車より徒歩の方が良いらしいです。

![](/blog/bocchi-the-cycling/D47578FD-A5F1-4C0B-8119-C6A0F2ABA2FE_1_105_c.jpg?w=1024&h=768)

「**漏れも遊具で遊びたいよ〜😭** (大人はダメ！！！！)」とキッズの人たちを横目に進みます。

![](/blog/bocchi-the-cycling/F70EB0A1-8ED1-40C2-9B5E-06774529077A_1_105_c.jpg?w=1024&h=768)

目の前には**バカ長い坂**が続いています。電チャリじゃなかったら許していません (2)。


```use-defined-component
use: time-limit
start: 16:30
current: 16:43
```

![](/blog/bocchi-the-cycling/FB19FDD1-6DBA-44FD-8C03-A302756A0A75_1_105_c.jpg?w=1024&h=768)

公園横の道路を走っていれば公園の中に案内してもらえる、というわけもなく住宅街にぶち込まれました。おーん😭 もっと公園の中も見たかったですが、今回はあまりに時間がないのでスキップします。**無理な計画はやめよう！**

![](/blog/bocchi-the-cycling/67E50645-EBF1-429A-B3C4-40A374ED60B4_1_201_a.jpg?w=3676&h=2757 "なんかいい路地bot")

随分と高いところに来てしまいました。遠くには**富士山**も見えて景色が最高です。

![](/blog/bocchi-the-cycling/561C40A2-7C56-4670-9DD9-E36C23B52457_1_105_c.jpg?w=1024&h=768 "富士山 (別の場所から)")

```use-defined-component
use: time-limit
start: 16:30
current: 16:47
```

![](/blog/bocchi-the-cycling/19BC6347-06BB-4C25-AC19-569C3DA71B0F_1_105_c.jpg?w=1024&h=768)

進みます。**富士山の写真を撮っていたらめちゃくちゃタイムロスしました。**

![](/blog/bocchi-the-cycling/3F8EA3B1-87AF-409C-A8BB-7FB4625D6BA4_1_201_a.jpg?w=1553&h=1165 "こういう分かれ方してる道路好き")

```use-defined-component
use: time-limit
start: 16:30
current: 16:56
```

![](/blog/bocchi-the-cycling/1CB80BD4-C894-4B83-A523-2548BC0B77D5_1_105_c.jpg?w=1024&h=768)

大通りに出てしばらく走りました。たぶんあと**2km**くらいはあって**圧倒的にピンチ**です。もう少し近くに**退避できそうなステーション**がないかどうかを調べます。

![](/blog/bocchi-the-cycling/32B57703-CE93-46E7-94A0-672A9B42F896_1_201_a.jpg?w=1179&h=1380)

近くにステーションがあるそうです。こちらに急いで向かいます！！！！

## 16:59 ファミリーマート 横浜片倉町店

```use-defined-component
use: time-limit
start: 16:30
current: 16:59
```

![](/blog/bocchi-the-cycling/17B3B823-F649-41F0-933B-C2A3276FB6BF_1_105_c.jpg?w=1024&h=768)

**来た！！！！！！！キタキタキタ、来ました！！！！**

残り1分でギリギリの返却です！！！！**アツい！！！！！！**<br>
手前の駐輪スペースに止めて返却ボタンを押します。

```conversation
自転車: **(ランプが赤く光る)**
私: おい！<b>何！？！？また通信エラー！？！？！？こんなときに！？</b>
私: 急げ、急げ、アプリを開きます、まだ大丈夫、まだ大丈夫
アプリ: **このステーションには返却できません**
私: **おや？**
```

![](/blog/bocchi-the-cycling/99607333-25C6-46CC-8085-C9E9539FF134_1_201_a.jpg?w=1179&h=892)

```centering-with-size-bold
2.5em
駐輪可能 0
```

**3度目の敗北が確定しました。**

おそらく、適切でない場所に返却している人がいたのでしょう。だから空きがあるように見えて、空いてなかったのですね。ぬか喜びでした。

![](/blog/bocchi-the-cycling/32B57703-CE93-46E7-94A0-672A9B42F896_1_201_a.jpg?w=1179&h=1380 "再掲")

しかし、幸か不幸か、このとき<u>返却可能な</u>最寄りのステーションはもともと行こうとしていたステーションだったので、なんか、こう、**試合に勝って勝負に負けた……** みたいな状態になっています。なんか違う気がする

いまいち納得いっていませんが、そちらの方まで自転車でスキップします。

![](/blog/bocchi-the-cycling/705F889B-A19C-4A8F-9D2B-473E20D3BCE8_1_105_c.jpg?w=1024&h=768)

## 17:05 🚲 三ツ沢上町駅自転車駐車場

```use-defined-component
use: time-limit
start: 16:30
current: 17:05
```

![](/blog/bocchi-the-cycling/15EC6407-8734-4CB2-B4C1-73DC1B9BC5D7_1_105_c.jpg?w=1024&h=768)

ということで、**三ツ沢上町駅自転車駐車場**に来ました。返却します。

```use-defined-component
use: finish-rental
times: 6th
start: 16:30
finish: 17:05
station: 三ツ沢上町駅自転車駐車場
total-price: 1080
```

もう超過しないようにしたい、もう超過しないようにしたいです。**お金の無駄なので**

HELLO CYCLING、冒頭にもちょろっと書いたように **12時間1800円** という料金設定も存在します。すなわち、30分ごとに乗り換える節約テクをしても**1800円**を超えるとその瞬間**損**になってしまいます。こんな苦行やって、更に損までするのは本当にバカらしいです。ですから、**今回はなんとでも1800円に収めたい気持ちがあります**。そのためにも、もう超過することは許されないのです。

もう二度と超過しないように、**頑張るぞ！！！！！**

```horizontal-images
![](/blog/bocchi-the-cycling/5B8CC4CE-E191-4AF9-83D3-C8211B24CC4B_1_105_c.jpg?w=1024&h=768)
![](/blog/bocchi-the-cycling/F061B5C1-C2AA-4839-99E7-B22C6BCDDC20_1_105_c.jpg?w=1024&h=768)
```

歩道橋を渡り、次のステーションに向かいます。

![](/blog/bocchi-the-cycling/2E4E24B8-A397-4BE9-801A-B36806FCC959_1_105_c.jpg?w=1024&h=768)

```next-page
高速道路を越えて……
```

<!-- page break -->

## 7th Ride: ファミリーマート 三ツ沢上町駅前

![](/blog/bocchi-the-cycling/BF382734-5432-4607-812C-20A8FC43B8A8_1_105_c.jpg?w=1024&h=768)

7回目のライドを始めましょう。

```use-defined-component
use: start-rental
times: 7th
start: 17:17
station: ファミリーマート 三ツ沢上町駅前
```

```use-defined-component
use: time-limit
start: 17:17
current: 17:17
```

実は今回は少しウキウキしています。

![](/blog/bocchi-the-cycling/IMG_0565.jpg?w=1084&h=1530)

それは、**高速道路を横断する箇所がある**からです。自転車で高速道路の上を渡ります！


```use-defined-component
use: time-limit
start: 17:17
current: 17:21
```


![](/blog/bocchi-the-cycling/AF231184-D550-4794-B1DC-18B7B2C2B63F_1_105_c.jpg?w=1024&h=768)

まずは歩道橋を渡ります。**ウワーッ！** 自転車なので歩道橋免除！と思いきや、自転車が渡れるタイプの歩道橋なので渡らなければいけません。面白いからね！！！！！！！！

![](/blog/bocchi-the-cycling/7BFBF276-7B72-4979-97E8-B462032E1525_1_105_c.jpg?w=1024&h=768)

**面白すぎ！！！！** こんなに面白いものがあって良いのか……

```use-defined-component
use: time-limit
start: 17:17
current: 17:23
```

![](/blog/bocchi-the-cycling/5E436988-C5C7-4ADE-AE4E-25F8CA3E4B4C_1_105_c.jpg?w=1024&h=768)

なんとか歩道橋を渡り切りました。**無駄に時間をロスした感は否めません**が、面白さのためなら仕方ない……それに今回は距離的にも短いですからね。

大通りではなく、写真右奥の細い道を進んでいきます。

![](/blog/bocchi-the-cycling/CA74C09B-B782-4C0D-A308-951A12FAED0B_1_105_c.jpg?w=1024&h=768)

進みます。

```use-defined-component
use: time-limit
start: 17:17
current: 17:27
```

![](/blog/bocchi-the-cycling/1745C27A-B7C5-4D7A-9CDE-BF71FE6C76FE_1_105_c.jpg?w=1024&h=768)

![](/blog/bocchi-the-cycling/9DEB763F-DA2F-42EE-9443-E7DA7765FB45_1_105_c.jpg?w=1024&h=768)

**高速道路を見下ろせる橋**に来ました。高速で車が移動しています。

![](/blog/bocchi-the-cycling/F02E77EF-5112-432F-A003-EF9A43CD4FAE_1_105_c.jpg?w=1024&h=768)

**面白い！！！！！！！**

```use-defined-component
use: time-limit
start: 17:17
current: 17:29
```

![](/blog/bocchi-the-cycling/35ADAD08-6438-4E43-A691-C81F3E81061B_1_105_c.jpg?w=1024&h=768)

だいぶ暗くなってきました。(気温は伴っていませんが、) やはり冬ということもあり18時前にはすっかり暗くなってしまっています。

```use-defined-component
use: time-limit
start: 17:17
current: 17:31
```

![](/blog/bocchi-the-cycling/FDE6C9FE-A381-4BE6-B65C-CD494C090E81_1_105_c.jpg?w=1024&h=768)

森の中を進みそうな道が現れました。
こんな細い道にも関わらず、街灯が多めに設置してあって不思議な雰囲気がありました。
強い **"誘導"** を感じます。ゲームだったら奥に重要なアイテム置いてある

![](/blog/bocchi-the-cycling/0D75362E-C575-47D4-9FE7-E06F8BD192D5_1_105_c.jpg?w=1024&h=768)

"誘導" に導かれ、森の中を進みます。

![](/blog/bocchi-the-cycling/AA770F2A-54ED-4D2B-B558-03A5A706D86B_1_105_c.jpg?w=1024&h=768)

ファンタジーな気分も束の間、また住宅地に放り出されました。

![](/blog/bocchi-the-cycling/DC4716E4-CB73-4014-A8B7-77256E0BC930_1_105_c.jpg?w=1024&h=768)

進みます。

```use-defined-component
use: time-limit
start: 17:17
current: 17:36
```

![](/blog/bocchi-the-cycling/5A626A57-CC63-4CB2-AB9D-3D7696366084_1_105_c.jpg?w=1024&h=768)

このあたりは高台で、ちょっと横にそれると**激坂**が現れます。お〜こわこわ と避けながら進みます。
登山でいうところの縦走をしている感覚です (？)

```use-defined-component
use: time-limit
start: 17:17
current: 17:39
```

![](/blog/bocchi-the-cycling/15B0893D-9100-40FD-ADB5-3CE51AE14874_1_105_c.jpg?w=1024&h=768)

**八王子街道**に出ました。ここをまっすぐ進めば八王子に行けるらしいです。

ところで何も気にしていなかったのですが、そろそろ時間がまずいです。ここで現在地を確認してみましょう。

![](/blog/bocchi-the-cycling/IMG_0565-2.jpg?w=1084&h=1530)

**おい！！！！！！！めちゃくちゃ遠回りしてる**

地図の案内を見ず、適当な雰囲気で進んでいるとこうなるので気をつけましょう。

流石に残り時間が怪しいので、本当に写真を撮らずに進みます。急げ、急げ……
最初のうちは<b>「ちょっとオーバーして罰金取られてもウケるかｗ」</b>みたいなカスの考えが頭の片隅にあった感は否めませんが、流石にもう余裕がなくなってきています。**もう安く早く帰りたい**

![](/blog/bocchi-the-cycling/0E073282-A3A7-4D8D-9406-4D0FF89E7C91_1_201_a.jpg?w=3061&h=1238)

**急ぎすぎて iPhone を道路に落下させ**、強化ガラスフィルムが欠けました。**おい！！！！！！！**
サンタさん治してくれ〜😭 急いでも良いことはないですし、**苦行をしても良いことはありません**。年末年始はおうちでゆっくりお過ごしください。

## 17:46 🚲 セブンイレブン 横浜星川駅南店

![](/blog/bocchi-the-cycling/F8730278-D2C5-4FC7-B141-EF11E4F465FF_1_105_c.jpg?w=1024&h=768)


```use-defined-component
use: finish-rental
times: 7th
start: 17:17
finish: 17:46
station: セブンイレブン 横浜星川駅南店
total-price: ???
```

慌てて道を間違えたり、慌ててiPhoneを割ったりした甲斐 (甲斐？) もあり、**なんとかギリギリ**30分以内の返却に成功しました。これで間に合ってなかったら iPhone の画面は無駄死にでした。良かった、良かった。**良くないが**

![](/blog/bocchi-the-cycling/BBFECAB6-777A-4D50-9BB4-3BCA60754FEF_1_105_c.jpg?w=1024&h=768 "星川駅")

**星川駅**です。天の川のようなきらきらした地名で良いですね。この写真をツイッタに投稿したら、即座にVのオタクからいいねが飛んできて良かったです。

![](/blog/bocchi-the-cycling/47215112-B9B9-4ACE-B247-4AF74BB545E7_1_105_c.jpg?w=1024&h=768)

進みます。奥にはクリスマスツリーがあり、クリスマスが近いんだなあ……という感じです。
クリスマス、いいですね！ウキウキします。実際の私がクリスマスに何をやっているかと言いますと、**この記事の執筆です**。許せん！

読者の大半はおそらく、聖夜に恋人とこの記事を読んでいることだろうと思います。カップルの方、いつも読んでくださりありがとうございます。

![](/blog/bocchi-the-cycling/3B797392-DDE7-40E2-9CEB-A0647A1A74D4_1_105_c.jpg?w=1024&h=768)

ところで今どこに向かっているかと言うと、次のステーションではなく………

## 18:00 🚶 イオン天王町ショッピングセンター

![](/blog/bocchi-the-cycling/64DC3414-AF3A-42D2-84C0-EFB4DD00A001_1_105_c.jpg?w=1024&h=768)

**イオン天王町ショッピングセンター**です。イオン巡り、4回目のお時間でございます。

これまでに下北沢、三軒茶屋、駒岡と巡り**全てで敗北**しています。記事の外でも橋本、多摩センター (foodium)、新百合ヶ丘、東麻布、稲城長沼 (イオンタウン, イオンフードスタイル, グルメシティ) で敗北しています。**10連敗**です。今度こそクリアファイルが欲しい……！

**今回こそ入手できるのでしょうか…………？**

<div style="height: 30vh"></div>

![](/blog/bocchi-the-cycling/IMG_2097.jpg?w=4032&h=3024)

**今回もダメでした……**。11連敗です。

Sof' は売っていたのですが、やっぱりクリアファイルがありませんね〜〜〜

本当にクリアファイルはこの世に残っているのでしょうか？そもそも私の探している場所は正しいのでしょうか？
もしかしたら私は意味のないことをしているのかもしれません。つらくなってきました。

**次のイオンは金沢八景**です。**金沢八景のイオンは22時に閉まる**ので、なんとしてでも早く金沢八景に着く必要があります。

<div class="time-limit">イオン金沢八景店閉店まで残り <span class="time-limit-counter">3</span> 時間 <span class="time-limit-counter">40</span> 分</div>

ここで場所を確認してみましょう。

![](/blog/bocchi-the-cycling/42map-hoshikawa.jpg?w=1419&h=1846)

開始から**7時間20分**経過で 3/5 くらいは進んだでしょうか。
単純計算であと**3時間**かかる見込みです。
金沢八景のイオンが閉まるのは**3時間40分後**なのでタイムアタックの流れになってきました。
**今回ずっと時間と戦ってて精神的ストレスがすごい**

## 18:22 🚶 横浜銀行保土ヶ谷支店を目指す

![](/blog/bocchi-the-cycling/9F8E87F5-BC80-4BBC-A6F6-0A77206D9861_1_105_c.jpg?w=1024&h=768)

ということで次のステーション、**横浜銀行保土ヶ谷支店**に向かいます。
残り3時間で着くとしても、あと少なくとも3回、4回は自転車に乗らないといけないらしいです。**本当に嫌になってきた**

![](/blog/bocchi-the-cycling/25C9AF37-C32A-4F55-949F-1335C76CEBA6_1_105_c.jpg?w=1024&h=768)

**今ここの商店街で一番顔が死んでいる自信もあります。**
実は iPhone が割れたことに気づいたのはここだったので、余計顔が死にました。
どうしてこんなことをしているのか……

心なしか、商店街の横断幕にも「**しんでね**」と言われている気がして気分が落ち込んできます。すみません、これは冗談です。

![](/blog/bocchi-the-cycling/F5752883-0042-476C-9030-0DBD86252524_1_105_c.jpg?w=1024&h=768)

進みます。

![](/blog/bocchi-the-cycling/yokohamabank-map.jpg?w=1132&h=1167)

そういえば載せていませんでしたが、こんな感じで移動します。そこそこ離れていて、**1.4km** 歩く必要があります。
今はイオンからまっすぐ進んでちょうど右折したくらいのところです。

## 18:33 🚶 天王町駅

![](/blog/bocchi-the-cycling/B5FF7998-A1D4-4A5B-88AB-8DB5027565A9_1_105_c.jpg?w=1024&h=768)

途中、まいばすけっと (イオン系列) を見つけたのでダメもとで入ったのですが、やはりクリアファイルはありませんでした。**対象店舗ではない**のでそれはそうなのですが、はい……

![](/blog/bocchi-the-cycling/DE2806DD-E4DA-48A9-AB2E-B9CE1FEDC318_1_105_c.jpg?w=1024&h=768)

もっと進みます。虚無が続いています。

```horizontal-images
![](/blog/bocchi-the-cycling/40FCE226-1055-4A98-8A4E-1C50AAE7D3A0_1_105_c.jpg?w=1024&h=768)
![](/blog/bocchi-the-cycling/C56BB2A5-636C-4381-91B4-E949BB92C9D7_1_105_c.jpg?w=1024&h=768)
![](/blog/bocchi-the-cycling/7A5A2B71-D848-4C71-99DD-43958609EFFB_1_105_c.jpg?w=1024&h=768)
```

ひたすら足を前を進めるのみ、何も考えず歩いていました。

## 8th Ride: 横浜銀行保土ヶ谷支店

<div class="time-limit">イオン金沢八景店閉店まで残り <span class="time-limit-counter">3</span> 時間 <span class="time-limit-counter">15</span> 分</div>

![](/blog/bocchi-the-cycling/C5C40F13-34BF-4079-ACDB-7225D334EF08_1_105_c.jpg?w=1024&h=768)

旧東海道沿いをひたすら歩いていたら、**横浜銀行保土ヶ谷支店**に到着しました。

いつものようにお支払いの手続きをして、8回目のライドを始めます。
流石に長めに歩いたので、自転車の移動速度が恋しくなってきました。**徒歩は遅い！！！！！！**

```use-defined-component
use: start-rental
times: 8th
start: 18:47
station: 横浜銀行保土ヶ谷支店
```

```use-defined-component
use: time-limit
start: 18:47
current: 18:47
```

![](/blog/bocchi-the-cycling/539EABE7-C1CE-42D0-B91C-D3D733815F67_1_105_c.jpg?w=1024&h=768)

始めていきましょう。

![](/blog/bocchi-the-cycling/IMG_1799B04587FA-1_2.jpg?w=1179&h=1818)

今回はこんな感じで行きますが、このときは<b>「残り10分になったら最寄りのステーションに返そう！」</b>という作戦だったので、目的地を決めず適当に走っています。**ステーションスカスカだけどそんな適当なプランで大丈夫なのか？**

```use-defined-component
use: time-limit
start: 18:47
current: 18:55
```

![](/blog/bocchi-the-cycling/7E953C02-9BE0-4F1E-8E81-713F17FC86BB_1_105_c.jpg?w=1024&h=768)

またアップダウンの激しい地帯に来ました。心の底から「家から自分の自転車を持ってこなくて良かった……」と思いました。

```use-defined-component
use: time-limit
start: 18:47
current: 18:59
```

![](/blog/bocchi-the-cycling/08BFF58C-C322-41AE-A98E-8E59D05AB896_1_105_c.jpg?w=1024&h=768)

引き続き走っています。先は長いです。

```use-defined-component
use: time-limit
start: 18:47
current: 19:07
```

![](/blog/bocchi-the-cycling/D1C3F45C-7294-4DE1-80A1-12724B52F6E1_1_105_c.jpg?w=1024&h=768)

さて、約束の「残り10分」になりました。返却するステーションを探しましょう。

![](/blog/bocchi-the-cycling/IMG_1799B04587FA-1.jpg?w=1179&h=1818)

今はこの地図の真ん中あたりの川にいます。すぐ近くにステーションがあるので、一見ここに退避するのが安全に思えます。しかし、よく見るとこのステーションは **"孤立"** しています。ここに返却すると次のステーションまで **2km 近く**歩く羽目になります。これはやめたほうが良いです。

そういうわけで、東側にある **"双子" のステーションに行くのが最適解**だと思われます。

![](/blog/bocchi-the-cycling/167CB71A-C9C3-49CC-92F5-0CCF41E799E1_1_105_c.jpg?w=1024&h=768)

結構時間が怪しいですが、間に合うことを祈って走ります。

```use-defined-component
use: time-limit
start: 18:47
current: 19:12
```

![](/blog/bocchi-the-cycling/240017E5-A6B8-4DE3-833D-C931229E5C8E_1_105_c.jpg?w=1024&h=768)

右に曲がり、**踏切**を抜けて坂を下り、もう一度右に曲がるとステーションがあるはずです。
落ち着いて走れば間に合うはずです。

<div style="height: 200px"></div>

![](/blog/bocchi-the-cycling/569BC4A5-1E1D-4928-BCBF-80229F6927E9_1_105_c.jpg?w=1024&h=768)

```centering-with-size-bold
2.5em
知ってた
```

**当然のように**踏切は閉まっています。知ってたよ！**知ってた！いつものことです！お前はいつもそうだ**

仕方ないのでステーションの場所を確認しながら待ちます。イメージトレーニングは大切ですからね。

```use-defined-component
use: time-limit
start: 18:47
current: 19:14
```

電車が2回通り過ぎるのを待ち、遮断機が上がったことを確認、踏切を渡ります。
予習したように冷静に、迷いなく、ステーションを目指します。

## 19:16 三春ビル

```use-defined-component
use: time-limit
start: 18:47
current: 19:16
```

![](/blog/bocchi-the-cycling/942268F3-8E1E-4DFA-9A50-78B6AB7AE0E2_1_105_c.jpg?w=1024&h=768)

なんとか時間内に辿り着きました、**三春ビル**です。ここで返却しましょう！

………

写真をよく見てください、<span style="font-size: 1.5em">**満車じゃないですか？** </span>

もしかして返却できない？ **返却できないなあ**、4度目の時間超過です。**悔しい！**

仕方ないので、ゆっくり双子のステーションに向かいましょう……。

![](/blog/bocchi-the-cycling/IMG_E6B879358780-1.jpg?w=1179&h=1410 "もう一方のステーションに移動する")

それにしてもだいぶ奥まったところにありますが、一体どこから入れるのでしょうか？
地図からは確認できないので、行って確認しましょう。

```use-defined-component
use: time-limit
start: 18:47
current: 19:18
```

![](/blog/bocchi-the-cycling/DD48241A-16CF-4860-956E-DC25C559A8AC_1_105_c.jpg?w=1024&h=768)

まずはこの**めちゃくちゃな激坂**を登ります。電動自転車のパワーをもってしてもだいぶ怪しかったです。押して登るべきだと思います。

![](/blog/bocchi-the-cycling/979F2F51-63F8-47D6-9303-602D2FB24DEA_1_105_c.jpg?w=1024&h=768)

登ったあと、周辺をうろうろしたのですが、どうしてもステーションが見つかりません。

```use-defined-component
use: time-limit
start: 18:47
current: 19:21
```

あまりに見つからず、どうしようか悩み始めていたそのとき……

![](/blog/bocchi-the-cycling/E06FE23B-5799-4938-A889-EC8AFB3D72F1_1_105_c.jpg?w=1024&h=768)

ひっそりと佇む「自転車借りられます」の看板が……<br>
<span style="font-size: 1.5em">**分かるか！！！！！！！！！！！！！！**</span>

![](/blog/bocchi-the-cycling/BC700774-2666-4931-81E8-3BB070A6A35B_1_201_a.jpg?w=4032&h=3024 "編集で明るくしていますが、実際は真っ暗です")

中に入ってみます。**本当にこんなところに駐輪場があるのか……？**

## 19:22 🚲 メゾンあすか

![](/blog/bocchi-the-cycling/57B6627F-A13A-4624-A382-1B230CF15EA6_1_105_c.jpg?w=1024&h=768)

<span style="font-size: 1.5em">うおおおお、**本当にあった！！！！！！**</span>

```use-defined-component
use: finish-rental
times: 8th
start: 18:47
finish: 19:22
station: メゾンあすか
total-price: ???
```

無事返却できました！改めて地図上で表すとここにありました。

![](/blog/bocchi-the-cycling/IMG_34D876618614-1.jpg?w=1518&h=808)

**分かりにくすぎる……💚** 私有地すぎて探索に勇気がいりました。

<div class="time-limit">イオン金沢八景店閉店まで残り <span class="time-limit-counter">2</span> 時間 <span class="time-limit-counter">35</span> 分</div>

さて、先ほどのステーションまで戻ってまた自転車を借りましょう……。

![](/blog/bocchi-the-cycling/92A825E0-ABED-44E3-AABE-BAF3BBA5877B_1_105_c.jpg?w=1024&h=768 "MEATFLIX")

肉の自販機がありました。

## 9th Ride: 三春ビル

![](/blog/bocchi-the-cycling/95C99340-F235-4A26-9129-A83438FEDC9D_1_105_c.jpg?w=1024&h=768)

戻ってきました。**三春ビル**です。それでは9回目のライドを始めましょう。

```use-defined-component
use: start-rental
times: 9th
start: 19:37
station: 三春ビル
```

```use-defined-component
use: time-limit
start: 19:37
current: 19:37
```

![](/blog/bocchi-the-cycling/AE12CBAC-91FA-46C0-8358-3D26EECCB82A_1_105_c.jpg?w=1024&h=768)

先ほど来た道を戻ります。

![](/blog/bocchi-the-cycling/IMG_0571.jpg?w=1399&h=2025)

今回はこのルートで行きます。前回、「残り10分になったら最寄りのステーションに返そう！」とか言っていたのは**流石にバカすぎの作戦だった**ので、今回はきちんと目的地を決めます。距離も控えめで、無理ゲー感は少ないと思います。**毎回似たようなこと言ってないか？**

```use-defined-component
use: time-limit
start: 19:37
current: 19:39
```

![](/blog/bocchi-the-cycling/B294B030-1D97-4229-B42B-40A959CAC339_1_105_c.jpg?w=1024&h=768)

```centering-with-size-bold
2em
もういいよ
```

待ちます。

```use-defined-component
use: time-limit
start: 19:37
current: 19:43
```

![](/blog/bocchi-the-cycling/13767E8B-A9B6-48AB-A595-DF219FE7F652_1_105_c.jpg?w=1024&h=768 "ぐねぐねロード")

```use-defined-component
use: time-limit
start: 19:37
current: 19:46
```


![](/blog/bocchi-the-cycling/425E1C2E-E63E-4986-80E2-1BCD7F81D413_1_105_c.jpg?w=1024&h=768 "なんか普通の路地bot")

```use-defined-component
use: time-limit
start: 19:37
current: 19:56
```

![](/blog/bocchi-the-cycling/F7CCF51D-6704-4315-AB73-0526CAC306C4_1_105_c.jpg?w=1024&h=768)

進みます。**めちゃくちゃ飽きてきました。**

本当に金沢八景行かなきゃダメ？みたいな気持ちになっています。
これ誰が得するんですかね。**苦行とかいうのやめたほうが良いですよ**

ソロ徒歩なら音楽聴きながら進むみたいなテクもありかもしれませんが、自転車なので音楽を聴くわけにもいきません。
**ひたすら虚無を感じながら進みのみ**です。バカがよ〜〜〜

![](/blog/bocchi-the-cycling/1AFE57BE-5212-4DFA-B03F-CA2E839657DA_1_105_c.jpg?w=1024&h=768)

進みます。

## 20:05 🚲 ヨークフーズ 上大岡店

```use-defined-component
use: time-limit
start: 19:37
current: 20:05
```

![](/blog/bocchi-the-cycling/8EF4C219-ACFA-4E26-8BFD-B66568C14ACD_1_105_c.jpg?w=1024&h=768)

目的地のヨークフーズに来ました。ここにステーションがあるようです。**探しましょう！**

……

………

…………

……………

………………

```use-defined-component
use: time-limit
start: 19:37
current: 20:07
```

![](/blog/bocchi-the-cycling/IMG_0573.jpg?w=1591&h=905 "返却場所探索の軌跡")

```centering-with-size-bold
2em
ステーションが無い！！！！！！！！
```

![](/blog/bocchi-the-cycling/hello-yorkmap.jpg?w=1179&h=1018)

<p style="text-align: center; font-weight: bold; font-size: 1.5em; color: red"> 
HELLO CYCLING アプリに載ってる場所にもステーションが無い！！！！！！！
</p>

<br>
<p style="text-align: center; font-style: italic; font-weight: bold; font-size: 1.5em; margin: 200px 0"> 
俺はどこに返せばいいんだ〜〜〜〜〜〜〜！！！
</p>

![](/blog/bocchi-the-cycling/IMG_0574.jpg?w=2092&h=1016)

<p style="text-align: center; font-size: 1.5em"> 
正解は<b>ヨークフーズの<span style="color: red">外</span></b>のここでした。
</p>

![](/blog/bocchi-the-cycling/6993D21B-786B-4484-AEBA-5AA6FBCEF3D3_1_105_c.jpg?w=1024&h=768)


<p style="text-align: center; font-style: italic; font-weight: bold; font-size: 2em"> 
分かるか〜〜〜〜〜〜〜！！！
</p>


<p style="text-align: center; font-style: italic; font-weight: bold; font-size: 1.5em"> 
許せん！！！！！！！！！！！！！！！！！！！！！
</p>


```use-defined-component
use: finish-rental
times: 9th
start: 19:37
finish: 20:08
station: ヨークフーズ 上大岡店
total-price: ???
```

<p style="text-align: center; font-style: italic; font-weight: bold; font-size: 2.5em; color: red; line-height: 1.2"> 
<span style="display: inline-block">時間超過</span><span style="display: inline-block">完了！！！！！！！！！！！！！！</span>
</p>

もうお金とかどうでも良くなってきました！！！！！<span style="color: red">***レンタサイクル最高！！！！！！！！！***</span>

<br>

……

<br>

Apple Maps や Google Maps に**詳細な返却場所が載っている**ことが分かったので、次回からはそれらを確認しましょう。
**HELLO CYCLING の微妙すぎる地図は見ないほうが良いです。**

```next-page
ラストスパート
```

<!-- page break -->

## 20:10 🚶 海側か陸側か

<div class="time-limit">イオン金沢八景店閉店まで残り <span class="time-limit-counter">1</span> 時間 <span class="time-limit-counter">50</span> 分</div>

ここから金沢八景までどのように進むかを考えます。

![](/blog/bocchi-the-cycling/IMG_2162.jpg?w=1179&h=1747 "返却可能ステーションで絞り込んだ地図")

陸側を通ると10km、海側を通るとおよそ12kmになるようです。
つまり、陸側を通れば残り 2〜3 回自転車に乗れば辿り着けて、海側だと **3〜4 回**乗る必要があるということになります。

もともと陸側を通る計画でしたが、陸側には一つ大きな落とし穴があります。それは、**ステーションの少なさ**です。"双子" のステーションがほぼ存在していないため、金沢動物園以外で時間切れになった場合、**長距離徒歩が確定**してしまいます。時間の残されていないこの状況において、**長距離徒歩は絶対に避けたい**です。

急がば回れとも言いますので、今回は計画を変更して少し遠回りになる**海側**を通っていきます。

これ以上のタイムロスがあると、**閉店までに金沢八景のイオンにつけるかがだいぶ怪しくなります**。
ルート選択の失敗は許されませんので、相当地図と睨めっこして決めました。12月10日現在、**2023年悩んだことランキング暫定1位**です。

![](/blog/bocchi-the-cycling/42map-york.jpg?w=1419&h=1846)

残りはおよそ **1/4**、頑張りましょう！

## 20:30 🚶 次のステーションへ向かう

<div class="time-limit">イオン金沢八景店閉店まで残り <span class="time-limit-counter">1</span> 時間 <span class="time-limit-counter">30</span> 分</div>

ルート決定に**20分**もかかったようです。**さっさと行け**、行きます。

![](/blog/bocchi-the-cycling/CD56A9E0-6FE6-49AC-9742-BEB975157A1E_1_105_c.jpg?w=1024&h=768)

たしかに失敗が許されないから悩んでいた面もありますが、**もう自転車に乗りたくないから悩んで先延ばしにしていた側面も大いにあります**。バカ

でも陸側を通れば、理論値で自転車あと2回というのはかなり魅力的でした。**もうレンタサイクルに乗りたくないので**。確実に乗る回数が1回増える海側を選ぶ判断を下すのは、今の自分にとってかなり大変なことでした。

![](/blog/bocchi-the-cycling/2E9609BD-52DE-454C-9979-0B32C5163E1E_1_105_c.jpg?w=1024&h=768)

**もう自転車乗りたくないよ〜〜〜** 借りる手続きも面倒だし、乗り始めたらすぐにルート決定して30分以内に返さないといけないし……と**ストレッサーが無限に存在**しています。「ストレスをすり減らしてまでレンタサイクル代をケチるのはネアンデルタール人のすることだ」とジョー・バイデンも言うと思います。

![](/blog/bocchi-the-cycling/9A4A7AEA-C88B-4069-B34F-D8BF7433586F_1_105_c.jpg?w=1024&h=768)

そろそろステーションがあるはずです。

## 10th Ride: 江ノ電バス 横浜営業所

![](/blog/bocchi-the-cycling/4832A580-834D-4542-B9B2-1F7A4AF0912A_1_105_c.jpg?w=1024&h=768)

ステーションがありました。**10回目**のライドを始めましょう……**全然気が乗らねえ………**

```use-defined-component
use: start-rental
times: 10th
start: 20:43
station: 江ノ電バス 横浜営業所
```

```use-defined-component
use: time-limit
start: 20:43
current: 20:43
```

![](/blog/bocchi-the-cycling/1B8C31A7-320E-4367-8AE0-FAF5FA3AE552_1_201_a.jpg?w=1923&h=1337)

今回はこんなルートで**新杉田駅**の方へ向かいたいと思います。

新杉田駅には「新杉田駅東口」「新杉田駅第四自転車駐車場」の2つのステーションがあります。
今回はより近い<b>「新杉田駅東口」</b>に返却し、歩いて「新杉田駅第四自転車駐車場」から自転車を借りようと思います。

ここで**返却に失敗するとシャレにならない**ので、あらかじめ**返却予約**を入れておこうと思います。
返却予約は 30 分間有効で、その間は<b>「せっかく返しに来たのに満車じゃねえか！！！キーッ！！！！」</b>となる事故が起こらなくなります。

<b>「キーッ！！！！」</b>と私が怒る姿を見たかった皆様、申し訳ありません😅

```use-defined-component
use: time-limit
start: 20:43
current: 20:45
```

![](/blog/bocchi-the-cycling/DA480427-093C-485C-B1EC-442C4F89760F_1_105_c.jpg?w=1024&h=768)

<div style="writing-mode: vertical-rl; display: flex; flex-direction: column; justify-content: center; width: 100%; font-family: serif; font-weight: bold; font-size: 1.8em">

すこやか整骨院<br>
<span style="font-size: 1.5em">交通事故</span>

</div>

初っ端から不吉な張り紙が出てきました。骨破壊したくなすぎ！！！！

そしてその奥に見えるのは

![](/blog/bocchi-the-cycling/0E8556A6-E27E-4BA2-84E9-AFF7E21431FC_1_105_c.jpg?w=1024&h=768)

**横浜刑務所**です。

![](/blog/bocchi-the-cycling/BF2F34CF-FB7E-4382-990D-AAAA90D2728E_1_105_c.jpg?w=1024&h=768)

ゴツめの歩道橋がありました。自転車も通れそうですが、面白いとか言ってる場合ではないのでスルーします。**本当に時間がない**

```use-defined-component
use: time-limit
start: 20:43
current: 20:54
```


![](/blog/bocchi-the-cycling/C4909FE3-43F4-458A-A668-34305033F78F_1_105_c.jpg?w=1024&h=768)

進みます。

本当に書くことがなくなってきました。終盤特有の無口タイムはソロ自転車においても発生するようです。

## 21:00 🚲 新杉田駅

```use-defined-component
use: time-limit
start: 20:43
current: 21:00
```

**新杉田駅**に来ました。ここでひとつ問題が発生しました。

![](/blog/bocchi-the-cycling/FBA86960-9BE4-478B-A02C-CB8495352880_1_201_a.jpg?w=1668&h=2063)

本来、私は図の上部<b>「新杉田駅東口」</b>というステーションに返却、歩いて下の<b>「新杉田駅第四自転車駐車場」</b>から自転車を借りる予定でした。
しかし「新杉田駅東口」をなかなか見つけられず、通り過ぎてしまいました。

ここはもう<b>「新杉田駅第四自転車駐車場」</b>に自転車を返却し、歩いて<b>「新杉田駅東口」</b>まで戻って自転車を借りた方が良いかもしれません。


![](/blog/bocchi-the-cycling/sugita-figure1.png?w=1462&h=632)

すなわち、この図のようになります。この方法だと**素早く自転車が返却できる**のでタイムアタックからすぐに解放されます。

![](/blog/bocchi-the-cycling/BF63974F-8084-4C75-8936-F6672184484D_1_105_c.jpg?w=1024&h=768)

そういうわけで<b>「新杉田駅第四自転車駐車場」</b>で返却しようと思います。こちらの駐輪場には空きが十分あるようですので、「新杉田駅東口」の方でしていた返却予約を解除して向かいます。


<div style="height: 100px"></div>

**いや、本当にこれで良いのか？**

**新杉田駅東口に引き返して返却するパターン**についても考えてみましょう。

![](/blog/bocchi-the-cycling/sugita-figure2.png?w=2132&h=1066)


**実は「新杉田駅東口」に引き返して返却した方が全体のタイムが短くなります。**

2つのステーション間を徒歩移動する時間はどちらのステーションに返却しても同じですが、引き返さない場合は今いる場所から第四駐輪場までの距離分、タイムロスが発生します。

また、金沢八景方面から若干離れている「新杉田駅東口」でレンタル開始すると、**2ステーション間分タイムロスすることになる**ため、その観点からも引き返して自転車を返却した方が良さそうです。

```use-defined-component
use: time-limit
start: 20:43
current: 21:05
```

![](/blog/bocchi-the-cycling/IMG_0580.jpg?w=1589&h=1956)

話がややこしくなってしまいましたが、とりあえず今は<b>「新杉田駅東口」に引き返して返却するパターン</b>を選択します。
自分にしては珍しく、残り時間もまだ残っているのでなんとかなるでしょう。

ここから一旦引き返し、**「新杉田駅東口」** に向かいます。

<div style="height: 100px"></div>

## 21:09 🚲 新杉田駅東口

```use-defined-component
use: time-limit
start: 20:43
current: 21:09
```

![](/blog/bocchi-the-cycling/4E9ECE5F-F5AA-4CB3-8F88-C7ED75AB63C7_1_105_c.jpg?w=1024&h=768)


```centering-with-size-bold
5em
満車
```

<div style="font-size: 1.8em; margin: 2em 0">

え！？！？！？！？**返却予約したのに！？！？！？**

</div>


> そういうわけで「新杉田駅第四自転車駐車場」で返却しようと思います。こちらの駐輪場には空きが十分あるようですので、**「新杉田駅東口」の方でしていた返却予約を解除して向かいます。**

<div style="font-size: 1.8em; font-weight: bold; margin: 2em 0">
返却予約解除してんじゃねえか！！！！！！！！！！！！！
マヌケか〜〜〜〜？？？？？
</div>

<div style="font-size: 1.5em; font-weight: bold; margin: 2em 0">
でもこの数分の間に取られることある〜〜〜〜〜〜？？？？？？？？？大人気ステーションすぎ！！！！！！！！！！！！！！！！！！！！！！！！
</div>

<div style="font-size: 1.5em; font-weight: bold; margin: 2em 0">
さっきの駐輪場の返却予約して爆速で戻ります！！！！！<br><span style="color: red">キーッ！！！！！！！</span>
</div>

```use-defined-component
use: time-limit
start: 20:43
current: 21:11
```

![](/blog/bocchi-the-cycling/906811CE-D515-404B-8602-72DD1C81BD9B_1_105_c.jpg?w=1024&h=768)

急ぎます、なんとか30分間以内には返却したいです。


## 21:12 🚲 新杉田駅第四自転車駐車場

![](/blog/bocchi-the-cycling/CDF18230-A3A1-458B-9098-B213B310108D_1_105_c.jpg?w=1024&h=768)

```use-defined-component
use: finish-rental
times: 10th
start: 20:43
finish: 21:12
station: 新杉田駅第四自転車駐車場
total-price: ???
```

ハア、ハア、なんとか時間内に返却できました。**時間内にできただけ偉い**

今から**もう一度**新杉田駅東口に徒歩で戻り、またこの近くに自転車で戻ってきます。**バカらしすぎるだろ〜〜〜〜〜** レンタサイクルやめた方が良いです。

![](/blog/bocchi-the-cycling/sugita-figure3.png?w=2088&h=1172)

つまり、こういうことが起こっています。**マヌケ**

## 21:13 🏃‍♀️ 新杉田駅東口まで戻る

<div class="time-limit">イオン金沢八景店閉店まで残り <span class="time-limit-counter">47</span> 分</div>

カスのタイムロスにより、**22時までの金沢八景到着が絶望的**になっています。くみれいクリアファイル、入手困難…………🤓😭

![](/blog/bocchi-the-cycling/05A7916A-68AA-455B-92AA-4DD95FCDCDA6_1_105_c.jpg?w=1024&h=768)

歩く、というかむしろ**走る**しかないです。**急げ！！！！！！！！**

![](/blog/bocchi-the-cycling/D468454E-5116-42D9-86A3-0868E06645D0_1_105_c.jpg?w=1024&h=768)

はあ、はあ………

![](/blog/bocchi-the-cycling/EC04124F-77F3-46AC-85FD-079F6EB1EC5E_1_105_c.jpg?w=1024&h=768)

<strong style="font-size: 1.8em">
オオオオオオオオオオオオオオオ
</strong>

## 21:19 🏃‍♀️ 新杉田駅東口

<div class="time-limit">イオン金沢八景店閉店まで残り <span class="time-limit-counter">41</span> 分</div>

![](/blog/bocchi-the-cycling/C8910878-0BA6-46C2-8854-F226C6CD79C0_1_105_c.jpg?w=1024&h=768)

なんとか**新杉田駅東口**まで着きました。

**これ22時までに間に合うわけなくないか！？！？** もう半分クリアファイル諦めモードです。

ここで[あずきバーさん](https://twitter.com/azukibar_D)から連絡が来ました。読んでみましょう。

![](/blog/bocchi-the-cycling/LINE_capture_725120369-443254.jpg?w=786&h=883)

<div style="margin: 100px 0">

> **ズル徒歩**やってるらしいので

</div>

<div style="font-size: 2em; font-weight: bold; text-align: center">
<span style="display: inline-block">ズル徒歩！？！？</span>！？！？！？！？！？！？！？！？！？！？！？！？！？
</div>

<div style="font-size: 3em; font-weight: bold; text-align: center; margin: 2em 0">
<span style="display: inline-block">ズル！？！？</span>！？！？！？！？！？！？！？！？！？！？！？！？！？
</div>

<div style="font-size: 2em; font-weight: bold; text-align: center; margin-bottom: 5em">
ちょっと！！！！！なら！！！！お前！！！やれよ！！！！！おい！！！！！！
</div>

> LINE PAY のあまりあげます

<div style="font-size: 5em; font-weight: bold; text-align: center">
😄😄😄
</div>

やはり、持つべきは優秀な自転車乗り継ぎ部後援会です。今度は**一緒に自転車乗り継ぎしましょう！**

---

さて、そろそろ出発します。
**ここから金沢八景までの道のり**を調べてみましょう。

![](/blog/bocchi-the-cycling/IMG_0583.jpg?w=1326&h=2027)

こんな感じでしょうか。

<br>

…………

<br>

…………

<br>

![](/blog/bocchi-the-cycling/IMG_0583-2.jpg?w=319&h=320)

<div style="font-size: 2em; font-weight: bold; text-align: center">
え！？！？！？！？！？！？！？
</div>

<div style="margin: 3em 0">

```link-embed
https://www.aeon.com/store/%E3%82%A4%E3%82%AA%E3%83%B3/%E3%82%A4%E3%82%AA%E3%83%B3%E9%87%91%E6%B2%A2%E3%82%B7%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E5%BA%97/
```

</div>

<div style="font-size: 3em; font-weight: bold; font-style: italic; text-align: center; font-family: serif; color: magenta">
UNEXPECTED AEON
</div>


<div style="margin: 3em 0">

> フロア基本営業時間<br>
> 1F食品 8:00〜23:00

</div>

<div style="display: grid; place-items: center; font-size: 1.3em">

<div class="time-limit">イオン<span style="color: magenta">金沢シーサイド店</span>閉店まで残り<span class="time-limit-counter">1</span> 時間 <span class="time-limit-counter">41</span> 分</div>

</div>

![](/blog/bocchi-the-cycling/04873D5D-23A1-4DC9-BA51-CCCE8B86D606_1_105_c.jpg?w=1024&h=768)

<video src="https://res.cloudinary.com/trpfrog/video/upload/v1703429644/blog/bocchi-the-cycling/pedestrian" controls></video>


<br>


## 11th Ride: 新杉田駅東口

**盛り上がってきました！！！！** 11回目のライドを始めていきます………！！！！

![](/blog/bocchi-the-cycling/4F0D36AD-5622-4073-8731-72797CD9122D_1_105_c.jpg?w=1024&h=768)

```use-defined-component
use: start-rental
times: 11th
start: 21:32
station: 新杉田駅東口
```

```use-defined-component
use: time-limit
start: 21:32
current: 21:36
```

![](/blog/bocchi-the-cycling/FD910E87-4E4F-4652-B31D-790C189C0DE5_1_105_c.jpg?w=1024&h=768)

またここを通ります。

```use-defined-component
use: time-limit
start: 21:32
current: 21:38
```

![](/blog/bocchi-the-cycling/A3F80C47-4A3B-4C7E-8B6D-2D3417730937_1_105_c.jpg?w=1024&h=768)

進みます。進みます。進みます。

![](/blog/bocchi-the-cycling/IMG_BE2FE938E302-1.jpg?w=1257&h=955)

**勢い余って道を間違えました。** (？？？)

![](/blog/bocchi-the-cycling/5BE95B2E-C57C-48B9-80F6-2EDED2C602AD_1_105_c.jpg?w=1024&h=768)

**戻ります。**

```use-defined-component
use: time-limit
start: 21:32
current: 21:44
```

```horizontal-images
![](/blog/bocchi-the-cycling/D8A57D21-22B2-4FAA-A6EB-C6E7658F5CC2_1_105_c.jpg?w=1024&h=768)
![](/blog/bocchi-the-cycling/005E225D-EB81-4AB7-ABBD-AA147705D695_1_105_c.jpg?w=1024&h=768)
```

進みます。

## 21:48 🚲 湾岸道路

```use-defined-component
use: time-limit
start: 21:32
current: 21:48
```

![](/blog/bocchi-the-cycling/98DB39EB-1D8D-4CB4-9024-6360B9D8C4D1_1_105_c.jpg?w=1024&h=768)

道に間違えたせいで時間内に返却できる気がしなくなってきましたが、なんとここからは**自転車専用道路**が出てきます。**アツい！！！！🔥🔥🔥** 

なんとかこれでさっきの道間違いを取り戻していきたいところです。

![](/blog/bocchi-the-cycling/IMG_DDC96EF4DAA2-1.jpg?w=1264&h=1906)

3.8km を残り14分で走る、いや〜……**厳しくないか？**

まあ、もう時間ないので「30分以内に返却！」とか**気にせず**走ります。いや、時間ないからこそ気にするのか？

```use-defined-component
use: time-limit
start: 21:32
current: 21:50
```

![](/blog/bocchi-the-cycling/B614EEFE-FCA4-4D54-AFAD-59B08FC1FC7A_1_105_c.jpg?w=1024&h=768 "南部市場駅")

進みます。

![](/blog/bocchi-the-cycling/8900AD06-5C0B-4E96-91BE-017C2ABCD297_1_105_c.jpg?w=1024&h=768)

**横断歩道がありません！**

つまり……

![](/blog/bocchi-the-cycling/B61F787D-E492-4FA9-B1D4-8900C274311B_1_105_c.jpg?w=1024&h=768)

**歩道橋があります😭**

自転車 + 歩道橋、最悪の組み合わせすぎる、**もう出てこないでくれ……**

![](/blog/bocchi-the-cycling/10BEAA66-0793-474D-8F72-6CBCA8089107_1_105_c.jpg?w=1024&h=768 "良さめ工業 かと思ったら ヲサメ だった")

```use-defined-component
use: time-limit
start: 21:32
current: 21:56
```

![](/blog/bocchi-the-cycling/25F4E889-1141-480E-A630-A9F9B13DA387_1_105_c.jpg?w=1024&h=768 "鳥浜駅 (三井アウトレットパーク 横浜ベイサイド前)")

```use-defined-component
use: time-limit
start: 21:32
current: 21:58
```

![](/blog/bocchi-the-cycling/69F1B32A-5B65-4D0A-80D2-BE08218DA435_1_105_c.jpg?w=1024&h=768 "並木北駅⁉️")

```use-defined-component
use: time-limit
start: 21:32
current: 22:01
```

![](/blog/bocchi-the-cycling/B30E6B1A-D1C0-4880-A462-CA54211F4947_1_105_c.jpg?w=1024&h=768 "並木中央駅")

はい、絶対間に合わん、絶対間に合いませんね。

自転車専用道路、走りやすいですが虚無がすごいです。
[中央環状線一周徒歩会](/blog/c2walker) の荒川を思い出します。**いいえ、自転車に乗ってる分圧倒的にこっちの方がマシ！！！！！自転車最高！！！！！！**

## 22:06 🚲 幸浦駅
  
```use-defined-component
use: time-limit
start: 21:32
current: 22:06
```

![](/blog/bocchi-the-cycling/7FBB1082-007A-402A-B786-EA3646453E43_1_105_c.jpg?w=1024&h=768)

**幸浦駅**にやってきました。
このままだと45分もオーバーして、**もう更に100円取られるのではないか**とヒヤヒヤしております。

どこで返却できるのかが謎だなあと、地図を見てみると……

![](/blog/bocchi-the-cycling/7484D032-B7B6-4F32-A5B0-AC7658D4631E_1_105_c.jpg?w=1024&h=768)

**どうやら上に運ぶのが正解なようです。** 苦しい！

![](/blog/bocchi-the-cycling/0E13E0A7-A748-4368-BA64-613B320AA605_1_105_c.jpg?w=1024&h=768)

キレながら押していると防犯登録のシールが目に入りました。
この自転車も**調布**からやってきたようです。お前も調布から来たんだな……

謎の親近感を覚えました。

<small>(初見の方向け: 私は調布の大学に通っています)</small>

```use-defined-component
use: time-limit
start: 21:32
current: 22:08
```

![](/blog/bocchi-the-cycling/21616A5D-4B48-4AF9-BA65-5DAE3AD7BEDB_1_105_c.jpg?w=1024&h=768)

急いでステーションに向かいます。**嘘です、もうどうせ30分をオーバーしているので呑気にブログ用の写真を撮っております。**

## 22:09 🚲 幸浦駅⻄口

![](/blog/bocchi-the-cycling/50E5656E-3907-4E53-9DC6-4904FFB6041F_1_105_c.jpg?w=1024&h=768)

```use-defined-component
use: finish-rental
times: 11th
start: 21:32
finish: 22:09
station: 幸浦駅⻄口
total-price: ???
```

返却できました。まあ、もう時間オーバーは慣れっこといった感じです。**慣れるな**

そんなことよりも早くイオンに向かいましょう！


<div class="time-limit">イオン金沢シーサイド店閉店まで残り <span class="time-limit-counter">50</span> 分</div>

![](/blog/bocchi-the-cycling/82FB93CF-32F4-4434-9FB7-8E9569F0EFEC_1_105_c.jpg?w=1024&h=768)

急ぎます。

![](/blog/bocchi-the-cycling/F331D29C-0127-42CD-8248-8272ACAB0D2B_1_105_c.jpg?w=1024&h=768)

**ウオオオオオ**

関係ないですけど、この写真の真ん中らへん、フクロウが飛んでいるように見えませんか？
なんか見えて怖くなっています。

![](/blog/bocchi-the-cycling/6DD26967-EBB5-487F-BACA-E39D5358FE33_1_105_c.jpg?w=1024&h=768)

<div style="font-size: 1.5em; font-weight: bold; margin: 2em 0">
イオンだ〜〜〜〜！！！！！
</div>

![](/blog/bocchi-the-cycling/C8649821-BACE-4A40-9DD3-36EAD6D066B8_1_105_c.jpg?w=1024&h=768)

<div style="font-size: 1.5em; font-weight: bold; margin: 2em 0">
オオオオオオオオオオ
</div>

## 22:15 🏃‍♀️ イオン金沢シーサイド店

![](/blog/bocchi-the-cycling/E3198AAC-F4AA-47D2-BCDA-31F0062C634A_1_105_c.jpg?w=1024&h=768)

**最終決戦**です。ここにクリアファイルがなければ、私がクリアファイルを入手する機会はもうないでしょう。

ここまでで、下北沢、三軒茶屋、駒岡、星川と、4つのイオン系列店で負けてきました。
なんとか、なんとか、在庫があって欲しい一心でここまできました。**頼む、あってくれ……！！！！**

最後のイオン巡りの結果は………！？

<div style="margin: 40vh"></div>

![](/blog/bocchi-the-cycling/IMG_2248.jpg?w=4032&h=3024)

<div style="margin: 150px"></div>

![](/blog/bocchi-the-cycling/9DA67F3D-9165-4AAC-ADFE-48E69F0C9211_1_105_c.jpg?w=1024&h=768)


<div style="font-size: 3em; font-weight: bold; text-align: center; margin: 2em 0">
<span style="display: inline-block">遂に見つかりました！！！</span>！！！！！！！！！！！！！！！
</div>

**ありがとう😭😭😭😭😭😭😭😭😭**

![](/blog/bocchi-the-cycling/B27BAB62-0292-4928-A5AB-0A629D91E282_1_201_a.jpg?w=4032&h=3024)

しかも Sof' を**4つ**も買ったので、**クリアファイル2枚**です。
ドライアイスを多めに下さった店員の方に感謝です😭😭😭

溶けないように**保冷バッグも買って**最強になっています。

```conversation
私: たぶんあと家帰るまで**2時間**はかかると思うんですけど、溶かさずに持ち帰れると思いますか？
店員さん: いや〜わからないね〜、ドライアイスはいっぱいあげるけど……
私: 保冷バッグは買おうと思ってるんですよね
店員さん: あ〜なら大丈夫だと思いますよ！あ、でも売ってたかな……<br>
**ねえ！〇〇くん！保冷バッグってどこ売ってたっけ？**
店員さん2: え〜、わからないな〜、**僕探してきます！**
店員さん: **私も探してきますね！**
私: あっえっいやっあっ……
私: <span style="opacity: 0.5">(今更売り場は知ってるなんて言えねえ……)</span>
```

ご迷惑をおかけました🙇🙇🙇 

親切な店員の皆様で良かったです。ありがとうございました。

<small>(ちなみに保冷バッグはアイス売り場に置いてある)</small>

今回はもうダメだと思ってたので、本当に見つかって良かったです。
自転車乗り継ぎの苦労が報われました。**レンタサイクル最高！！！！** もう自転車しか乗りません！！！！

## 22:30 🚶 長浜公園を目指す

今回の目標の一つである「くみれいクリアファイルの入手」はなんとか達成できました。良かったです。さて、ここからは最終目標「レンタサイクルで金沢八景に行く」を達成しにいきます。

ここで金沢八景発の**終電**を確認しましょう。

<div style="font-size: 1.5em">

> 京急 金沢八景駅発 **23:20**

</div>

**23時20分！？！？！？**

<div style="display: grid; place-items: center; font-size: 1.5em">

<div class="time-limit">終電まで残り <span class="time-limit-counter">50</span> 分</div>

</div>

終電を逃すと野宿が確定となり、次の日の予定が怪しくなってきます。**そんなギリギリのスケジュールで変なチャレンジするな**

![](/blog/bocchi-the-cycling/IMG_0589.jpg?w=1938&h=1084)

というわけで次のステーション、「長浜公園」まで徒歩で向かいます。
**650m** の短いコースなので急いでいきましょう！

<div class="time-limit">終電まで残り <span class="time-limit-counter">48</span> 分</div>

![](/blog/bocchi-the-cycling/D1154321-9AF9-4D67-8489-20E51BA8CC0D_1_105_c.jpg?w=1024&h=768)

急いでいるのに赤信号が私を邪魔します。いつものこと、いつものこと……

![](/blog/bocchi-the-cycling/B80C5BCE-94A8-47DC-AEE1-EEFB76BFFDD5_1_105_c.jpg?w=1024&h=768)

めっちゃ急ぎます。

<div class="time-limit">終電まで残り <span class="time-limit-counter">45</span> 分</div>

![](/blog/bocchi-the-cycling/D1696EC9-77F5-424B-8E7D-B51E275087E1_1_105_c.jpg?w=1024&h=768)

歩道橋がありました。**面白いので渡りましょう！**


```horizontal-images
![](/blog/bocchi-the-cycling/0837C1D4-7A01-4F07-8456-66ECFBE29DCD_1_105_c.jpg?w=1024&h=768)
![](/blog/bocchi-the-cycling/74BFCF36-3DC6-4281-8368-D28C761B59C0_1_105_c.jpg?w=1024&h=768)
```

**ルンルン♪**

ところで今ここはどこでしょう？長浜公園までの道のりを確認します。

<div style="height: 150px"></div>

![](/blog/bocchi-the-cycling/IMG_0589-2.jpg?w=1839&h=1070)


<div style="font-size: 2.5em; font-weight: bold; text-align: center; margin: 1em 0">
道間違えてる……
</div>

バカ！**間違えてる場合じゃないでしょ！！！！！！**

めちゃくちゃ道間違えてるのに歩道橋でルンルンしてたのバカすぎる、**急ぎます！！！！！**

<div class="time-limit">終電まで残り <span class="time-limit-counter">43</span> 分</div>

![](/blog/bocchi-the-cycling/DE0243BD-966F-4D5A-BDBC-37EC8CC1C6EB_1_105_c.jpg?w=1024&h=768)

ウオーーーーーーーーーーー！！！！！

<div class="time-limit">終電まで残り <span class="time-limit-counter">41</span> 分</div>

![](/blog/bocchi-the-cycling/5802224B-C43F-4D26-8041-230BE4BA9B5E_1_105_c.jpg?w=1024&h=768)

**ダッシュ！ダッシュ！ダッシュ！ダッシュ！**

<div class="time-limit">終電まで残り <span class="time-limit-counter">39</span> 分</div>

![](/blog/bocchi-the-cycling/B9B1D67E-10AD-4821-AC8F-BF2E12229C03_1_105_c.jpg?w=1024&h=768)

***大人はダメ！大人はダメ！大人はダメ！大人はダメ！***

<div class="time-limit">終電まで残り <span class="time-limit-counter">37</span> 分</div>

![](/blog/bocchi-the-cycling/3DC92F4E-07CC-4254-8716-C50C60A17877_1_105_c.jpg?w=1024&h=768)

<span style="font-size: 1.5em">***急げ急げ急げ！！！！！！***</span>

## 12th Ride: ⻑浜公園

<div class="time-limit">終電まで残り <span class="time-limit-counter">36</span> 分</div>

![](/blog/bocchi-the-cycling/5DC0A65D-2D05-4638-AA39-B62A900748E9_1_105_c.jpg?w=1024&h=768)

ここまでの11 (+1) 回のライドで培った経験を活かして、爆速レンタルを試みます。
**HELLO CYCLING 早くロードしろ！！！！！！！！！**

```use-defined-component
use: start-rental
times: 12th
start: 22:45
station: ⻑浜公園
```

<div class="time-limit">終電まで残り <span class="time-limit-counter">35</span> 分／残り 5.5 km</div>

![](/blog/bocchi-the-cycling/200A7C57-D2C9-445A-BD63-2E606036A59E_1_105_c.jpg?w=1024&h=768)

**行くぞ！行くぞ！！！！！**

もはや30分以内の返却なんかよりも、終電に間に合う方が優先度高いです。**終電に間に合えば30分も間に合う！！！！**

もうブログなんてクソどうでもよくて、**立ち止まって写真を撮る時間なんてありません！**
次に写真を撮るのは赤信号に捕まったときになるでしょう。

<div class="time-limit">終電まで残り <span class="time-limit-counter">29</span> 分／残り 4.0 km</div>

![](/blog/bocchi-the-cycling/DE59735F-6DED-469F-93DA-60B45EC396C1_1_105_c.jpg?w=1024&h=768)

すみません、**ちょっとおしゃれなトイレがあったので写真を撮ってしまいました**。

<div class="time-limit">終電まで残り <span class="time-limit-counter">23</span> 分／残り 2.6 km</div>

![](/blog/bocchi-the-cycling/22C915BF-B0A8-47EF-83BF-9153C15FA6AE_1_105_c.jpg?w=1024&h=768)

焼肉きんぐがありました。そういえば新横浜駅からずっと胃にものを入れていないことに気づきました。とはいえ、**ご飯なんて食べていたら終電が消えます**。

そもそもなぜ金沢八景に行くのかというと、**ぼっち・ざ・ろっく！の聖地巡礼がしたかったから**です。聖地巡礼の時間は最低限確保したいです。そのためなら空腹も我慢できる……！！！！

しかし、今から行って巡礼している時間は本当にあるのでしょうか？ **聖地巡礼の時間がなかったら、本当になんのために来たのか分からなくなってしまう**

<div class="time-limit">
終電まで残り <span class="time-limit-counter">19</span> 分／残り 1.7 km
</div>

![](/blog/bocchi-the-cycling/FA606C13-4ACC-47F5-98F8-3E988DDC869B_1_105_c.jpg?w=1024&h=768)

ここの信号が本当に長くて、ずっと待たされました。
**青になったらすぐにでも行きたい**という気持ちでいっぱいでした。

しかし、ここはかなり治安が悪く、こっちの信号が青になっても**10秒くらいは車が平気で突っ込んできていて**カスでした。青になったからと慌てて飛び出していたら、今ごろぺらぺらの和紙になっていることでしょう。

<div class="time-limit">
終電まで残り <span class="time-limit-counter">16</span> 分／残り 1.5 km
</div>

![](/blog/bocchi-the-cycling/958A0AD1-F2F7-403D-A925-5AF3809FFDE3_1_105_c.jpg?w=1024&h=768)

少しでも急ぐため、Apple マップの言うことを聞いて細い道をくねくねと通って行きます。
本当は**こんな道を通ったら迷うリスクが大きい**ので避けたいですが、そんなことも言ってられません。

マップを頻繁に見て、道を暗記、**右！左！左！右！左！** と道を突き進んでいきます。**左右盲トロッコアドベンチャー**

ひやひやしながら狭い道を進み続けると……

## 23:08 🚲 琵琶島神社

<div class="time-limit">
終電まで残り <span class="time-limit-counter">12</span> 分／駐輪場まで残り 200 m
</div>

![](/blog/bocchi-the-cycling/182637AC-AA74-4AC8-ABF0-CDAC21D0A0C3_1_105_c.jpg?w=1024&h=768)

**琵琶島神社**に着きました。**ここだ〜〜〜〜〜！！！！！！！**

ここはぼっちちゃんがきくりさんと遭遇するところですね。**感動すぎる……**

ここまであまりに**虚無な道**ばかり通り、**理不尽な目**に遭い続けてきたので感動で涙が出そうです。**感動で涙が出るってこういうことなんだ…………**(？)
![](/blog/bocchi-the-cycling/699DA807-4506-4922-B03A-7F2760E37532_1_105_c.jpg?w=1024&h=768 "本編では出てこなかったと思うけど奥の方")

感動も束の間、終電までのリミットが迫っています。**急ぎます！！！！！！**

## 23:10 🚲 「ステージみたいなベンチ」

<div class="time-limit">
終電まで残り <span class="time-limit-counter">10</span> 分／駐輪場まで残り 100 m
</div>

![](/blog/bocchi-the-cycling/E83D5D0D-4557-437D-B8BD-9638F2C2C29D_1_105_c.jpg?w=1024&h=768)

うおおお、ここは2人が**路上ライブ**をやっていたところです。アツい！！！！！！！

本当にここでやってたんだ………！！！！

![](/blog/bocchi-the-cycling/8222CF7F-C942-42DE-9418-E13B282CCD31_1_105_c.jpg?w=1024&h=768)

こっちは虹喜多自販機です。**あっつ〜〜〜！！もうすっかり夏だね〜〜〜！！！！ですね〜〜！！！**

![](/blog/bocchi-the-cycling/AABA6441-59A1-4062-A429-750E744BF3AE_1_105_c.jpg?w=1024&h=768 "こっちはぼっちちゃんの通学路")

各聖地を**1分以内で巡礼**するバチ当たりな巡り方をしております。<br>
仕方ないだろ！！！！終電が近いんだから！！！！

**急いでステーションに向かいます。**


## 23:11 🚲 金沢八景駅第四自転車駐車場


<div class="time-limit">
終電まで残り <span class="time-limit-counter">9</span> 分
</div>

![](/blog/bocchi-the-cycling/073B6704-D399-4378-BEA0-607B0CC758AB_1_105_c.jpg?w=1024&h=768)

```use-defined-component
use: finish-rental
times: 12th
start: 22:45
finish: 23:11
station: 金沢八景駅第四自転車駐車場
total-price: ???
```


<div style="font-size: 2.5em; font-weight: bold">
返却完了！！！！！！！！！！！！！！
</div>

なんとか、なんとか**下北沢から金沢八景まで**レンタサイクルで行くことができました。**嬉しい！！！！！！！！！！！！！！！！！**

久しぶりにこんな達成感を感じています、**本当に苦しかった！！！！！！！！！！！！！！！もう二度とやらねえ！！！！！！！！！！！！！**

![](/blog/bocchi-the-cycling/DD85CF59-CBF7-4212-9881-C84B1799781E_1_105_c.jpg?w=1024&h=768)

もうここでずっと海を見ていたいくらいの気分ですが、そんなわけにもいきません。

終電に乗り込みに行きます。

<div class="time-limit">
終電まで残り <span class="time-limit-counter">8</span> 分
</div>

![](/blog/bocchi-the-cycling/E263A30F-BD1E-4207-B63B-4B6720C6E558_1_105_c.jpg?w=1024&h=768)

目の前にあるのが、**金沢八景駅**です。早く信号変わってくれ！！！！

まだまだ時間に余裕があるように思えますが、初めて行く駅なのでどんなトラップが待ち構えているか分かりません。実際今回私は<b>「これぐらい余裕だろ！」「ｸﾞｴｰ 罰金100円」を無限回やった</b>ので、最後くらいはきちんと余裕を持って行きたいです。

<div class="time-limit">
終電まで残り <span class="time-limit-counter">7</span> 分
</div>

![](/blog/bocchi-the-cycling/8C72461D-C83E-42E3-8109-F2D27CB8D066_1_201_a.jpg?w=4032&h=3024)

**ウオオオ 行け行け行け行け**

## 23:15 🚶 金沢八景駅

<div class="time-limit">
終電まで残り <span class="time-limit-counter">5</span> 分
</div>

![](/blog/bocchi-the-cycling/083A21DD-388E-4501-A36D-C2139CC2942E_1_105_c.jpg?w=1024&h=768)

**なんとか！！！！終電に！！！！間に合いました！！！！**

5分前行動過激派もニッコリです。本当に TrpFrog さん、お疲れ様でした……。**大変だった……**

それでは、本日はこちらで失礼します。


## 終わりに

今日は**レンタサイクルを乗り継いで下北沢から金沢八景まで行き**、ついでにイオン巡りをしてくみれいクリアファイルを入手してきたという記事でした。

やってる側はかなり大変なのに、記事にするとイマイチ味がしなくて**もう二度とやるか**となっています。もうレンタサイクル乗らん

24日間カレンダーを埋めてくださった皆様も本当にありがとうございました！
また**来年もぜひ苦しんでいきましょう！** それでは良いお年を〜

## TOTAL RESULT

`````ignore-read-count

<div style="overflow-x: scroll; white-space: nowrap; margin: 1em 0">

| 回数 | 開始ステーション | 返却ステーション | 開始時刻 | 終了時刻 | 利用時間 | 金額 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | さいとうビル (三軒茶屋付近) | 駒沢オリンピック公園きりんさんパーキング | 12:13 | 12:41 | 28分 | 130円 |
| 2 | 駒沢オリンピック公園サービスセンター駐輪場 | ファミリーマート 世田谷玉堤店 | 12:54 | 13:30 | 36分 | 230円 |
| 3 | ローソン 世田谷玉堤一丁目店 | セブンイレブン 川崎市ノ坪⻄店 | 13:46 | 14:18 | 32分 | 230円 |
| 4 | 川崎市中原平和公園1 | ローソン 横浜樽町三丁目店 | 14:35 | 15:03 | 28分 | 130円 |
| 5 | 綱島温泉 湯けむりの庄 | ファミリーマート 新横浜三丁目店 | 15:19 | 15:47 | 28分 | 130円 |
| 6 | ファミリーマート 港北篠原町店 | 三ツ沢上町駅自転車駐車場 | 16:30 | 17:05 | 35分 | 230円 |
| 7 | 三ツ沢上町駅自転車駐車場 | セブンイレブン 横浜星川駅南店 | 17:17 | 17:46 | 29分 | 130円 |
| 8 | 横浜銀行保土ヶ谷支店 | メゾンあすか | 18:47 | 19:22 | 35分 | 230円 |
| 9 | 三春ビル | ヨークフーズ 上大岡店 | 19:37 | 20:08 | 31分 | 230円 |
| 10 | 江ノ電バス 横浜営業所 | 新杉田駅第四自転車駐車場 | 20:43 | 21:12 | 29分 | 130円 |
| 11 | 新杉田駅東口 | 幸浦駅⻄口 | 21:32 | 22:09 | 37分 | 230円 |
| 12 | ⻑浜公園 | 金沢八景駅第四自転車駐車場 | 22:45 | 23:11 | 26分 | 130円 |

</div>


```result-box
乗車回数: 12回
超過回数: 6回
乗車時間: 6時間 14分
合計金額: 2160円
```

<br>
<br>


> HELLO CYCLING、冒頭にもちょろっと書いたように **12時間1800円** という料金設定も存在します。すなわち、30分ごとに乗り換える節約テクをしても**1800円**を超えるとその瞬間**損**になってしまいます。こんな苦行やって、更に損までするのは本当にバカらしいです。ですから、**今回はなんとでも1800円に収めたい気持ちがあります**。そのためにも、もう超過することは許されないのです。

<br>

> <span style="font-size: 1.3em"> 合計金額 **2160円** </span>

<div style="text-align: center; font-size: 1.8em; margin: 5em 0">

***レンタサイクルは乗り継がず、12時間パックで乗ろう！***

</div>

`````
