---
title: ある点Pから最も近い半直線上の点Qを計算する
date: 2021-05-10
tags: 技術, 数学
description: 証明とProcessingによるビジュアライズ
---

こんにちは、つまみ (<a href="https://twitter.com/trpfrog">@TrpFrog</a>) です。生まれてから一度も歩いたことがありません。

大学の課題でタイトルの内容をどうしても計算したくなる機会があったのですが僕のググり力不足かヒットせず、
泣く泣く自力で計算する羽目になったので覚書を残します。
数学的な議論が怪しいのはご容赦ください。(は？)(ツッコミがあればお願いします)

あと**Processing.jsを使ってみよう！** ということで、記事の最後に触って確かめられるProcessingのコードを載せました。

## 前提知識

この記事における前提知識は

- 三角関数 ($\sin, \cos, \tan, \mathrm{arc\hspace{0px}tan})$
- 高校数学レベルのベクトル
- 行列の積と回転行列

です。結果を知りたいだけならばこの知識は不要です。


## 解きたい問題

次のような問題が解きたいです。


<div style="padding: 10px 20px; border: 2px solid #90e200; border-radius: 10px;">
    <p>
        <b>問題</b>
    </p>
    <p>
        $xy$ 平面上に点 $A$ から点 $B$ 方向に伸びる半直線 $L$ と、点 $P$ があります。
        このとき、点 $P$ から最も近い $L$ 上の点 $Q$ を求めてください。
    </p>
    <p style="text-align:center">
        [f:id:TrpFrog:20210510042300p:plain]
    </p>
</div>


## 直線で考える

さて、いきなり半直線で考えるのは大変そうなので直線で考えてみましょう。すると次のような問題になります。

<div style="padding: 10px 20px; border: 2px solid orange; border-radius: 10px;">
    <p>
        <b>問題 (2)</b>
    </p>
    <p>
        $xy$ 平面上に<strong>直線</strong> $AB$ と点 $P(x, y)$ があります。
        このとき、点 $P$ から最も近い直線 $AB$ 上の点 $R$ を求めてください。
    </p>
</div>


この問題は簡単です。直線 $AB$ に向けて点 $P$ から下ろした**垂線とその交点**が $R$ となります。さてそのような $R$ を実際に求めてみましょう。


### ベクトル方程式で表す


原点を $O$ としたとき, $\vec{a} = \overrightarrow{OA}, \vec{b} = \overrightarrow{OB}, \vec{v} =  \overrightarrow{AB}$ とします。また、直線 $AB$ 上の点 $R$ の位置ベクトルを $\vec r$ とします。このとき直線 $AB$ のベクトル方程式はパラメータ $t$ を用いて次のように表すことができます。

$$
\vec r = \vec a + t \vec v \tag{1}
$$

また、$\vec v$ の同じ大きさの法線ベクトルを $\vec u$ とします。すなわち

$$
\vec v \cdot \vec u = 0, \quad |\vec v| = |\vec u|
$$

となるようなベクトル $\vec u$ です。このとき、平面上の任意の点 $P$ の位置ベクトル $\vec p$ はパラメータ $s, t$ を用いて次の式で表すことができます。

$$
\vec p = \vec a + s \vec v + t \vec u \tag{2}
$$

これらの情報から点 $R$ を求めてみます。$R$ は直線 $AB$  に向けた**垂線と直線の交点**でした。$\vec u$ と $\vec v$ は直交しますから、求める点 $R$ の位置ベクトル $\vec r$ は式 (2) におけるパラメータをそのまま使って次のように表すことができます。

$$
\vec r = \vec a + s \vec v \tag{3}
$$

これで問題(2) の**答えがわかりました！**めでたしめでたし……ではなく $s, t$ を求める必要があります。

### Pの座標からパラメータを求める

式(2) を変形して次のような式を作ります。

$$
\vec p - \vec a = s \vec v + t \vec u
$$

$\vec u$ と $\vec v$ は直行していますから、$\vec p - \vec a$ を $\vec v$ が $x$ **軸と平行になるように回転してあげて**、そのときの $x$ 座標を $|\vec v|$ で割った値を読むと $u$ がわかります。これは $\vec v$ の $x$ 軸となす角 (反時計回りを正とする) を $\theta$ として次のように表すことができます。

$$
\begin{align\*}
\begin{bmatrix}
s \\\\ t
\end{bmatrix}
&=
\frac{1}{|\vec v|}
\begin{bmatrix}
\cos(-\theta) & -\sin(-\theta) \\\\
\sin(-\theta) & \cos(-\theta)
\end{bmatrix}
\begin{bmatrix}
x - x_A \\\\ y - y_A
\end{bmatrix}\\\\
&=
\frac{1}{|\vec v|}
\begin{bmatrix}
\cos\theta & \sin\theta \\\\
-\sin\theta & \cos\theta
\end{bmatrix}
\begin{bmatrix}
x - x_A \\\\ y - y_A
\end{bmatrix}\\\\
&=
\frac{1}{|\vec v|}
\begin{bmatrix}
(x - x_A)\cos\theta + (y - y_A)\sin\theta \\\\
-(x - x_A)\sin\theta + (y - y_A\cos\theta
\end{bmatrix}
\end{align\*}
$$

従って $R$ を求めるのに必要だったパラメータ $s$ は

$$
s = \frac{(x - x_A) \cos \theta + (y - y_A) \sin \theta}{|\vec v|}
$$

であるとわかりました。

### $\vec v$ の $x$ 軸となす角 $\theta$ を求める

次に $s$ を求めるのに必要な $\theta$ を計算しましょう。$\vec v = \overrightarrow{AB} = \vec b - \vec a$ であったことを思い出してください。つまり直線 $AB$ の傾きが求まれば良いです。ここで $A(x_A, y_A), B(x_B, y_B)$ とすると

$$
\begin{align\*}
\tan \theta &= \frac{y_B -y_A}{x_B-x_A}\\\\
\theta &= \mathrm{arc\hspace{0px}tan}\frac{y_B -y_A}{x_B-x_A}
\end{align\*}
$$

です。ただし $x_B - x_A \neq 0$ 。$x_B - x_A = 0$ の時は今回は議論しません。ここについては各プログラミング言語の標準ライブラリとして存在するはずの便利関数 $\mathrm{atan\hspace{0px}2}(y, x)$ を用いて

$$
\theta = \mathrm{atan\hspace{0px}2}(y_B -y_A, x_B-x_A)
$$

を使ってください。(は？)

以上の議論より、問題(2)の答えの点 $R$ の位置ベクトル $\vec r$ は

$$
\begin{align\*}
\vec r &= \vec a + s\vec v\\\\
s &= \frac{(x - x_A) \cos \theta + (y - y_A) \sin \theta}{|\vec v|}\\\\
\theta &= \mathrm{atan\hspace{0px}2}(y_B -y_A, x_B-x_A)
\end{align\*}
$$

であると分かりました。

## 半直線の問題を解く

さて、ここまでで元の問題の9割は解き終わりました。ここで元の問題についてもう一度考えてみましょう。

<div style="padding: 10px 20px; border: 2px solid #90e200; border-radius: 10px; -moz-border-radius: 10px; -webkit-border-radius: 10px;">
<p>
<b>問題 (再掲)</b>
</p><p>
$xy$ 平面上に点 $A$ から点 $B$ 方向に伸びる半直線 $L$ と、点 $P$ があります。このとき、点 $P$ から最も近い $L$ 上の点 $Q$ を求めてください。
</p>
<p style="text-align:center">
[f:id:TrpFrog:20210510042300p:plain]
</p>
</div>

結論から述べると、点 $Q$ の位置ベクトルを $\vec q$ としてこの問題の答えは次の通りです。

$$
\begin{align\*}
\vec q &= \vec a + \max(0, s)\vec v\\\\
\vec a &= (x_A, y_A) \\\\
\vec b &= (x_B, y_B ) \\\\
\vec v &= \vec b - \vec a\\\\
s &= \frac{(x - x_A) \cos \theta + (y - y_A) \sin \theta}{|\vec v|}\\\\
\theta &= \mathrm{atan\hspace{0px}2}(y_B -y_A, x_B-x_A)
\end{align\*}
$$

$\vec v$ の係数を $\max(0, s)$ としただけです。なぜこうなるかは簡単です。パラメータ $s$ は直線のときと同様の議論をすることで

$$
\vec r = \vec a + s \vec v
$$

を満たすような $s$ であることがわかります。このとき半直線 $AB$ に**乗らない**ように、$R$ を点 $A$ から点 $B$ と反対方向に動かしていくと $s < 0$ となってしまいます。よって負の数だけをカットすれば良く、$\vec v$ の係数は $\max(0, s)$ であるとわかります。


## 本当にそうなるの？

数学が下手くそな人間が数字をこねくり回してるだけでは信憑性に欠けるので(？)確認用のProcessingのコードを置いておきます。また、下の画像をマウスオーバーすることでそのような点 $Q$ が描画されます。実際に上で示した式が正しいことを動かして確認してみてください。

<iframe 
    src="https://codesandbox.io/embed/half-line-csgij?fontsize=14&hidenavigation=1&theme=dark&view=preview"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="half_line"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts">
</iframe>

```java
PVector A, B;

void halfStraightLine(float x1, float y1, float x2, float y2) {
    final int INF = 10000;
    line(x1, y1, x1 + (x2 - x1) * INF, y1 + (y2 - y1) * INF);
}

PVector calcQ(float x, float y) {
    float theta = atan2(B.y - A.y, B.x - A.x);
    float d = dist(A.x, A.y, B.x, B.y);
    float s = (cos(theta) * (x - A.x) + sin(theta) * (y - A.y)) / d;
    x = A.x + Math.max(0, s) * (B.x - A.x);
    y = A.y + Math.max(0, s) * (B.y - A.y);
    return new PVector(x, y);
}

void setup() {
    size(300, 400);
    A = new PVector(100, 100);
    B = new PVector(200, 300);
}

void draw() {
    background(245);

    stroke(0);
    halfStraightLine(A.x, A.y, B.x, B.y);
    noStroke();

    final PVector p = new PVector(mouseX, mouseY);
    final PVector q = calcQ(p.x, p.y);
    final int r = 10;

    textSize(16);
    fill(200);
    text("A", A.x + r, A.y + r);
    text("B", B.x + r, B.y + r);
    ellipse(A.x, A.y, r, r);
    ellipse(B.x, B.y, r, r);

    fill(0);
    text("P", p.x + r, p.y + r);
    text("Q", q.x + r, q.y + r);

    fill(#dbbb92);
    ellipse(p.x, p.y, r, r);

    fill(#90e200);
    ellipse(q.x, q.y, r, r);
}
```
