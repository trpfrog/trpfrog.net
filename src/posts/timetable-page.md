---
title: 時間割作るやつを作った
date: 2021-09-29
updated: 2021-09-29
tags: 大学, 技術
description: ホームページに設定すると便利！
thumbnail: https://res.cloudinary.com/trpfrog/image/upload/v1641545315/blog/timetable-page/thumbnail.webp
---

時間割がブラウザのホームページにあると便利！

![thumbnail](https://res.cloudinary.com/trpfrog/image/upload/v1641545315/blog/timetable-page/thumbnail.webp)

<a href="https://github.com/TrpFrog/timetable-page" class="linkButton">GitHubで見る</a>

## これは何？

オンライン授業、アクセスするサイトがたくさんあって大変ですよね。僕はこんな感じのページを作ってリンクをまとめて対処していました。**強いみなさんならもう勝手に作ってそうですが**、せっかくなので使いやすくまとめてGitHubで公開してみました！



## 使い方

使い方は簡単！

1.  リポジトリを**cloneします**
2.  [timetable-example.js](https://github.com/TrpFrog/timetable-page/blob/main/src/timetable-example.js) を timetable.js に**リネームします**
3.  テンプレートに従ってtimetable.jsに**授業情報を書き込みます**
4.  index.html を開くと**時間割ができています！**

**すごい！**

ちなみに timetable.js はこんな感じです。

![timetablejs](https://res.cloudinary.com/trpfrog/image/upload/v1641545316/blog/timetable-page/timetablejs.webp)

割とわかりやすいのではないでしょうか。

これを保存してindex.htmlを開くとこうなります。

![screenshot](https://res.cloudinary.com/trpfrog/image/upload/v1641545315/blog/timetable-page/screenshot.webp)

うふふ (関係ないですが、これは確定した時間割ではないです。結構単位を持っているので**ガハハ**)



## 仕組み

仕組みというほどの仕組みはありませんが、このjsファイルを読み込んで時間割情報をもとに適切な場所に書き込みます。**CSS Grid Layout** を使いました。CSS Grid Layout パワーで**2時間以上連続する授業もつなげて描画できる**ようになっています。すごい！



## その他

他には [color.css](https://github.com/TrpFrog/timetable-page/blob/main/src/color.css) に色の定数がまとまっているので、ここをいじるだけで配色を変えられます。つまみネット風の初期デザインアンチの方はぜひ。あと **Zoomのリンク** や **Classroomのリンク** が**特殊なアイコン**で表示されます！便利！

(2行しかないけど) ﾝｷﾞｯｸｽでなんかするDockerfileも置いたので**HTML直で開きたくないぜ！**って人は使ってください。

その他詳しくは英語ですが(自己満足)(は？)[README.md](https://github.com/TrpFrog/timetable-page/blob/main/README.md)をご覧ください。



## 注意

これで作った時間割を「外でも見たいぜ！」とか言って**インターネットにあげると情報が流出して死ぬ**ので注意してください。Zoom授業に裸の淵野アタリが入ってきます。



ぜひ使ってみてね！さようなら

<a href="https://github.com/TrpFrog/timetable-page" class="linkButton">GitHubで見る</a>
