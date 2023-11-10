---
title: ツイートを拾ってニコニコ風に流すツールをJavaで作った
date: 2020-11-23
updated: 2020-11-23
tags: 技術, 大学
description: Javaで作るコメント流しツール
thumbnail: https://res.cloudinary.com/trpfrog/image/upload/v1641983536/blog/twitter-screen/thumbnail.png
---

この記事は本家つまみログの [ツイートを拾ってニコニコ風に流すツールをJavaで作った](https://trpfrog.hateblo.jp/entry/twitter-screen) を焼き直したものです。


---

こんにちは、つまみ([@TrpFrog](https://twitter.com/TrpFrog))です。足が痛いです。 

先日[某電通大東方サークル](https://twitter.com/uec_Touhou_)の[方](https://twitter.com/Asunarowasabi_U)に「ハッシュタグ拾って画面に流すツール作れない？」と頼まれ、<s>面白そうだったので</s>そういうツールを作ってみることにしました。

![](/blog/twitter-screen/20201123164502?w=827&h=411)

車輪の再発明はしたくありません。とりあえずググってみてもヒットしなかったので作ることにしました。完成品はこちらになります！

<a href="https://github.com/TrpFrog/TwitterScreen" class="linkButton">View Twitter Screen on GitHub</a>

背景を透明化できるので、Twitterのコメントを流しながら配信イベントを見たり


![](/blog/twitter-screen/20201123201542?w=1200&h=643 "電通大のバーチャルライブ研究会のイベントMIKUECで使った例")

背景色を緑に設定してクロマキー合成で配信に使ったりできます。

![](/blog/twitter-screen/20201123201741?w=1144&h=622 "トレンド上位にあったハッシュタグを雑に流した、政治系ハッシュタグ読まされて鬱(自爆)")

```twitter-archived
id: 1330753236391796736
date: 2020-11-23
tweet: 本当にコメント<small style="opacity: 0.3">(公式のだが)</small>流れててテンション上がってる
image: https://res.cloudinary.com/trpfrog/blog/twitter-screen/EnfJA4KUwAEheRh.jpg
```

![](/blog/twitter-screen/20201123203116?w=541&h=197 "[依頼主のサークルの配信](https://www.youtube.com/watch?v=mzzegvls8PQ&feature=youtu.be)に使われて生まれて初めてSpecial Thanksされた、うれし〜")

完成後、記事を書くぞ！と編集画面を立ち上げて「ニコニコ風に流すツール」まで書いたところで嫌な予感がしました。

[https://twitter.com/TrpFrog/status/1330756282358263808:embed#ちなみに嫌な予感がしてさっき「Twitter ニコニコ風」で調べたら同じようなやつがゴロゴロ出てきて泣いてしまいました]

どうして((なんでニコニコ風という単語に気がつかなかったんですかね？とはいえJava製のものは見つからなかったのでセーフ！(本当ですか？) ))

それはさておき、せっかく作ったので開発までの過程を書いていきます。<b>この記事ではコードの読みやすさを優先してimport文やgetter/setterを大幅に省略しています。</b>完全なコードを見たい方はGitHubを覗いてみてください。あまり綺麗ではないので恥ずかしいですが！><



## 仕組み

Twitter APIのJava用wrapperというとても優秀なライブラリである**Twitter4J**を使います。仕組みは簡単で検索したい単語を指定して、ストリームを開始、流れてきたツイートを画面に流すだけです！簡単！

## 開発過程

### コメントクラスをつくる

コメントに関する情報を保存しておくためにコメントクラスを作ります。

```java
public class Comment {
    private final String text;
    private final Font font;
    private final Color fontColor;
    
    private double x;
    private int y;
    
    private final int width;
    private final int height;
    private final int margin = 10;
    
    private final long createdDate = System.nanoTime();
    
    // Constructor, getter/setter, equals, hashCode は省略
}
```

こんな感じで良いでしょう。たぶん。

x座標がdoubleになっているのはコメントの速度調整をゆるやかにしたいという目的があります。例えば0.1ずつ増やしたいと思ってもintだと floor(x + 0.1) = x ですので止まったままになってしまいます。ceil(x + 0.1) = x+1 でも速すぎてしまいます。ですので、doubleを使っています。



### コメントを流す画面をつくる

#### ウィンドウ作り

まず、一番重要なコメントを流すウィンドウを作ります。記事の一番上で挙げたような画像のように背景色を透明にしたいと思います。JavaでGUIを作るときはSwingという標準APIを使います。まずJFrameというクラスを使ってウィンドウを作っていきます。


```java
public class CommentFrame extends JFrame {
    public CommentFrame() {
        // 画面中央に寄せる
        setLocationRelativeTo(null);
        // 画面のデコレーション(閉じるボタンとか)を切らないと透明にならない
        setUndecorated(true);
        
        setBackground(new Color(0,0,0,0));
        getContentPane().setBackground(new Color(0,0,0,0));
		
        setSize(800, 600);
        setResizable(true);
        setVisible(true); //表示！
    }
}
```

とりあえずこんなものでしょうか。



#### パネル作り

ウィンドウはできたので、ここからJPanelを使ってコメントを乗せるためのパネルを作ります。

```java
public class CommentPanel extends JPanel {
    // 今あるコメントを保存する
    private List<Comment> commentList = new LinkedList<>();

    public CommentPanel(Color backgroundColor, Color borderColor) {
        // 枠の色を設定
        setBorder(new LineBorder(borderColor));
        setBackground(backgroundColor);

        // コメントの位置は絶対座標で指定したいのでレイアウトは指定しない
        setLayout(null);
    }
}
```

だいたいこうです。(これしか言ってない)

おっと、JPanelで完全に透明化したいとき`setBackground(new Color(r,g,b,0))` だと描画時に関係ないウィンドウを描画したり好き放題暴れてしまいます。そこで `setBackground`を次のようにOverrideしておきます。(やっていいのかは知りません……)

```java
@Override
public void setBackground(Color bg) {
    if(bg.getAlpha() != 0) {
        super.setBackground(bg);
    } else {
        setOpaque(false); //JFrameは透明のときこうしないとバグる
    }
}
```



#### 描画処理

CommentPanelに描画処理も乗っけましょう。あとで枠をつけたりとか自由度を上げたいのでpaintComponentを使います。JLabelを使っても良かったのですが。

リストを渡して全部出力してもらうようにします。

```java
@Override
public void paintComponent(Graphics g) {
    super.paintComponent(g);
    // リストにあるコメントを全部描画する
    for(Comment c : commentList) {
        g.setFont(c.getFont());

        // あとで使います
        // g.setColor(Color.GRAY);
        // paintFontBorder(g, c, 2);

        g.setColor(c.getFontColor());
        int x = c.getX();
        int y = c.getY() + c.getHeight() - c.getMargin();
        g.drawString(c.getText(), x, y);
    }
}

public void paintComments(List<Comment> commentList) {
    this.commentList = commentList;
    repaint(); //paintComponentを呼び出すおまじない
}
```

#### 縁を描く

これだけでは寂しい、というか文字色と同じ色の背景のとき見づらいので縁を描きましょう。((縁ちゃんではなくフチ、[淵野アタリ](https://twitter.com/ebioishii_u)でもないあんなおかしいのと縁ちゃんを一緒にしないでくれ給へ))

とりあえず `paintComponent()` の中に `g.setColor()` と `paintFontBorder()` をおきます。そして `paintFontBorder()` を次のように実装します。

```java
private void paintFontBorder(Graphics g, Comment c, int borderSize) {
    for(int i = -borderSize; i <= borderSize; i++) {
        for(int j = -borderSize; j <= borderSize; j++) {
            int x = c.getX() + i;
            int y = c.getY() + j + c.getHeight() - c.getMargin();
            g.drawString(c.getText(), x, y);
        }
    }
}
```

縁取りの手っ取り早いライブラリやアルゴリズムが見つからなかったので自前のO(n^2) アルゴリズムで実装しました。くやし〜何かいい方法を知ってる方は教えてください。とはいえそんなにデカい縁を使う人が存在するとは思えませんが。

簡単にいうとx座標, y座標をそれぞれ -borderSize から borderSize までずらして描画を繰り返します。((今思ったのですが太さってもしかしてSizeじゃなくてWeightを使いますね？英語力の無さが露見してしまいました......。))

こうすることで文字を縁取りできるようになりました！
最後にこのパネルをCommentFrameにaddすれば完成です。


### コメントの挿入位置を決定するやつをつくる

描画するだけではなくロジックっぽいことをするものを作りたいと思います。やりたいことはとりあえず

-   描画パネルを持っているCommentFrameのインスタンスを持っておく。
-   コメントを保管するリストをつくる。
-   まだ流していないコメントを保存しておくキューをつくる。
-   画面に入りきっていないコメントを保存する集合をつくる。
-   コメントを挿入可能なY座標を保管する集合をつくる。
-   コメントの高さを保管する。
-   10msおきにコメントを画面に送り出すタイマーをつくる。

の7つです。実装するとこうです。


```java
public class CommentProvider {
    // フレーム本体をメモしておく
    private final CommentFrame SCREEN;

    private final List<Comment> ACTIVE_COMMENTS = 
        Collections.synchronizedList(new LinkedList<>());
    private final Queue<String> COMMENT_STR_QUEUE = 
        new ConcurrentLinkedQueue<>();
    private final Set<Comment> NEW_COMMENTS 
        = Collections.synchronizedSet(new HashSet<>());

    private final TreeSet<Integer> INSERTABLE_Y = new TreeSet<>();

    private final Timer TIMER = new Timer(10, e -> moveComments());

    private final int FONT_HEIGHT;

    public CommentProvider(CommentFrame SCREEN) {
        this.SCREEN = SCREEN;
        this.FONT_HEIGHT = config.FONT_SIZE + 20; //20はマージン分
        
        refreshInsertableY();
    }
    
    // 画面をフォントの高さで割って挿入可能な高さリストをつくる
    public void refreshInsertableY() {
        synchronized(INSERTABLE_Y) {
            for(int i = 0; i + FONT_HEIGHT <= SCREEN.getHeight(); i += FONT_HEIGHT) {
                INSERTABLE_Y.add(i);
            }
        }
    }
}
```

ひい、結構な量になってしまいました。



#### コメントの追加処理

コメントの追加処理もやってしまいましょう。やりたいことは次の3つです。

-   コメントの追加
    -   キューに入れる
-   挿入可能かのチェック
    -   挿入可能Y座標の集合が空かどうかを見てO(1)で判断します
-   挿入位置の返却
    -   挿入可能Y座標の集合の最小値をO(log n)で返します。
    -   これがしたいのでTreeSetを使っていました。
    -   ただ実際はそんなに挿入行は多くはならないので線形探索した方がいいかもしれません、自己満足(は？)

```java
public void addComment(String comment) {
    System.err.println(comment);
    if(!canInsert()) return;
    COMMENT_STR_QUEUE.add(comment);
}

public synchronized boolean canInsert() {
    return !INSERTABLE_Y.isEmpty();
}

private synchronized int pollOptimalY() {
    Integer ret = INSERTABLE_Y.pollFirst();
    return ret == null ? - FONT_HEIGHT : ret;
}
```



#### コメントを動かす

最後にコメントを動かすパートです。ウオオオ、一番肝心なパートです。

アクティブなコメントのリストを線形探索していき、1つ1つのX座標を動かしていきます。画面外に出たら捨てたいのでイテレータを使います。捨てる処理があるのでアクティブなコメントリストはLinkedListで実装しています。((線形リストなので削除がO(1)で終わる))

やりたいことは次の通りです。

-   移動距離 dx を計算
-   コメントの全てにdxを足す
-   コメントが画面内に入りきったらNEW_COMMENTからそれを削除
    -   さらに挿入可能なY座標の集合にそのコメントのY座標を追加
-   画面外に出たらリストから削除
-   キューから新たなコメントを拾ってくる

```java
private synchronized void moveComments() {
    
	// Cのポインタみたいなやつ
    Iterator<Comment> it = ACTIVE_COMMENTS.iterator();

    // 2048は速度調整
    double dx = - (commentSpeed * updateInterval) / 2048.0; 
    
    while(it.hasNext()) {
        Comment cmt = it.next();

        cmt.setDoubleX(cmt.getDoubleX() + dx);

        // コメントが初めて画面に入りきったか
        boolean canInsertOnThisLine = 
            cmt.getDoubleX() + cmt.getWidth() + 10 < SCREEN.getWidth() && NEW_COMMENTS.contains(cmt);
        if(canInsertOnThisLine) {
            synchronized(INSERTABLE_Y){
                INSERTABLE_Y.add(cmt.getY());
            }
            NEW_COMMENTS.remove(cmt);
        }

        boolean inViewerBounds = cmt.getDoubleX() + cmt.getWidth() >= 0;
        if(!inViewerBounds) {
            it.remove();
        }
    }

    // 描画
    SCREEN.getInnerPanel().paintComments(ACTIVE_COMMENTS);

    // 描画できる限りキューのコメントを拾ってくる
    insertCommentsInQueue();
}

private void insertCommentsInQueue() {
    while(canInsert() && !COMMENT_STR_QUEUE.isEmpty()) {
        // 画面の右端にコメントを追加
        Comment newComment = new Comment(COMMENT_STR_QUEUE.poll(), SCREEN.getWidth(), pollOptimalY());
        ACTIVE_COMMENTS.add(newComment);
        NEW_COMMENTS.add(newComment);
    }
}
```

これでaddCommentすれば自動でコメントが画面を流れる処理が完成しました！わーい

ここまでだいたい3時間ぐらいで実装できました。(もちろん後々見つかったバグの修正や仕様変更を除く)

### ツイートを拾ってくる

さて、ツイートを拾っていきましょう。まずすることは次の3つです。

-   フィルタワードリストのファイルを拾ってくる。
-   その検索語でストリーム((ツイートが流れてくる川と考えてください))をフィルタするように指示する。
-   ストリーミングを開始する。((UserStreamingが死んだ件が話題になっていましたが、特定のワードに引っかかったものを引っ張ってくるストリーミングについてはまだ生きています。ちんちんリツイートbotなどもたぶんそれを使っています(例がひどすぎる) ))

```java
public class WordStreamReader implements StatusListener {
    private TwitterStream twitterStream;
    private final CommentProvider COMMENT_PROVIDER;

    // TwitterCommentFactoryについてはあとで説明します
    private TwitterCommentFactory commentFactory = new TwitterCommentFactory();

    public WordStreamReader(CommentProvider cp, String filterTextPath) throws IOException {
        COMMENT_PROVIDER = cp;

        // ファイルを読んで行ごとに区切って配列にする
        String[] filterWords =
                Files.readAllLines(Paths.get(filterTextPath))
                .stream()
                .map(String::trim)
                .toArray(String[]::new);
        
		// フィルタに配列を入れる
        FilterQuery filterQuery = new FilterQuery();
        filterQuery.track(filterWords);

        // ストリーミングを開始
        twitterStream = new TwitterStreamFactory().getInstance();
        twitterStream.addListener(this);
        twitterStream.filter(filterQuery);

        // アプリケーション終了時にストリームを閉じるようにする
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            twitterStream.shutdown();
        }));
    }
}
```

StatusListenerをimplementsしているので他のメソッドもオーバーライドします。今回使うのはonStatus(ツイートを拾ったときの動作)だけなのでそこだけ書きます。

-   RTとリプライを消す。
-   Statusというツイートのデータが入るクラスから文字列を生み出してaddCommentする。

```java
@Override
public void onStatus(Status status) {
    String comment = status.getText();
    // RTとリプライを排除
    if(status.isRetweet()) return;
    if(status.getInReplyToUserId() > 0) return;
    COMMENT_PROVIDER.addComment(commentFactory.generate(status));
}
```

ここでcommentFactoryはStatusというツイート用のクラスからコメント用に加工した文字列をつくる「工場」です。この工場を見ていきましょう。



### ツイートからコメント用文字列を生み出す工場を建てる

単純にツイートを加工するだけなので上のクラス内に書いても良さそうですが、それにしてはちょっと処理が複雑なのでこうしたファクトリに分けました。<s>ちょっとFactoryっていうのがかっこいいのでやってみたかった。</s>

-   ツイートからリンクやハッシュタグを削除して空白で連結する。
-   IDと名前の表示設定から出力形式を変える。

をします。

```java
public class TwitterCommentFactory {

    private boolean screenNameVisible = false;
    private boolean nameVisible = false;
    private boolean removeLinks = true;
    private boolean removeHashtags = true;

    public String generate(Status status) {
        String screenName = status.getUser().getScreenName();
        String name       = status.getUser().getName();
        
        // 改行やスペースで分けてハッシュタグやリンクを削除する
        String tweet      =
                Arrays.stream(status.getText().split("[ 　\n]"))
                .filter(e -> !removeLinks || !e.matches("^https://t\\.co/.*"))
                .filter(e -> !removeHashtags || !e.matches("^#.+"))
                .collect(Collectors.joining(" "));
        
        // 4つの形式に対応して表示を加工
        if(screenNameVisible && nameVisible)
            return name + "(@" + screenName + "): " + tweet;
        else if(screenNameVisible)          
            return screenName + ": " + tweet;
        else if(nameVisible)                
            return name + ": " + tweet;
        else                                
            return tweet;
    }
}
```

StreamAPI((TwitterのStreaming APIとは別物です、ちょっと紛らわしいですが))というのが便利で

-   空白と改行で切って(これはStreamAPIではないが)
-   その配列をストリームにして
    -   `Arrays.stream(status.getText().split("[ 　\n]"))`
-   リンクを消して
    -   `.filter(e -> !removeLinks || !e.matches("^https://t\\.co/.*"))`
-   ハッシュタグも消して
    -   `.filter(e -> !removeHashtags || !e.matches("^#.+"))`
-   全部を空白で繋げる
    -   `.collect(Collectors.joining(" "));`

をたったの1文で、直感的な文法でこなすことができます。すき！


### 設定ウィンドウとかconfigとか

あとは定数で設定した部分(更新間隔、コメントが流れる速度、Factoryの設定など)を変数に置き換えて、configファイルから拾ってきた値を当てはめたり、設定ウィンドウに入れたものを適用させたりして完成！ここは本質的な部分ではないので省略します。

## 拡張性

ここまでの開発で気をつけたことがあります。それは**コメントを流す処理にTwitterAPIを混ぜない**ということです。これにより<b>コメントを流す画面のライブラリとして使うことができる</b>という嬉しいことが起こります。つまりツイートを拾うだけでなく、別の配信サービスのコメントを拾うAPIを使って拾って流したりすることもできます。例えば次のように実装できます。

```java
public class Main {
    public static void main(String[] args) {
        CommentFrame frame = new CommentFrame(new ScreenConfigs("filePath"));
        CommentStreamReader stream = new CommentStreamReader();
    }
}

class CommentStreamReader implements CommentListner {
    CommentFrame frame;
    CommentStream stream;
    
    public CommentStream(CommentFrame frame) {
        this.frame = frame;
        this.stream = new CommentStream();
        stream.addListener(this);
    }
    
    @Override
    public void onCommentReceived(String comment) {
        frame.getCommentProvider().addComment(comment);
    }
}

class CommentStream {
 	// APIを叩いてストリームに流すやつ
}

interface CommentListener {
	public void onCommentReceived(String comment);
}
```

ということでJavaでコメント流すツールの話でした。Google検索の能力をこれからも磨いていきましょう！

おわり
