---
title: TypeScript で lazy property を型安全に作る
date: '2023-12-17'
tags:
  - 技術
description: 超・型パズル
thumbnail: >-
  https://res.cloudinary.com/trpfrog/image/upload/v1671174054/blog/code-with-ai/code-with-ai.jpg
---

```centering
**この記事は<span class="tw-inline-block">「[N予備校プログラミングコース Advent Calendar 2023](https://qiita.com/advent-calendar/2023/nyobi)」</span>
<span class="tw-inline-block"><span style="font-size: 1.5em">XX</span> 日目の記事です。</span>**
```

```link-embed
https://qiita.com/advent-calendar/2023/nyobi
```

https://qiita.com/advent-calendar/2023/nyobi

こんにちは、つまみ ([@TrpFrog](https://github.com/TrpFrog)) と申します。
大学院では自然言語処理の研究をしていて、趣味では Web 開発をしています。
少し前まで type-challenges をたくさん解いていました。

Swift の **lazy property** はご存知でしょうか？以下をご覧ください。

```swift
class LazyObject {
  let fileName: String,
  lazy var contents: () {
    // 重い処理を行うExpensiveClassのインスタンスを作成する
    return ExpensiveClass()
  }()
}
```

ここで `lazy` は**遅延処理**を行うことを意味します。すなわち、上のコードの場合 **contents に初めてアクセスしたとき、初期化が走る**のです。このようなプロパティを lazy property と呼びます。

さて、lazy property はどのようなときに役立つのでしょうか？

**TODO: lazy property の役立つ例についてまとめる**


<!-- window break -->

## JavaScript で作る

さて、まずは **JavaScript** で作っていきます。<br>
TypeScript の型定義は後ほど追加しますのでご安心ください。

ああああ
あああ

### ゴール

次のような関数 `createLazyObject` を作成します。

- `createLazyObject` には作成したいオブジェクトの定義を渡す
- プロパティ名が `lazy_${propertyName}` となっているものは `propertyName` という名前の lazy property とする
  - すなわち `obj.propertyName` を呼び出したとき、初めて評価が始まる
  - `lazy_${propertyName}` には必ず関数 `() => V` を渡すものとし、`propertyName` の型は `V` とする

これだけでは何を言っているのかさっぱりなので、次の例を見てください。

```js
const profile = createLazyObject({
  age: 23,
  id: 'TrpFrog',
  lazy_birthday: () => fetchBirthday(),
  lazy_birthPlace: () => fetchBirthPlace(),
})

console.log(profile) 
// => { age: 23, id: 'TrpFrog', birthday: [Getter], birthPlace: [Getter] }

console.log(profile.age)        // => 23
console.log(profile.id)         // => 'TrpFrog'
console.log(profile.birthday)   // => '2000-10-17'
console.log(profile.birthPlace) // => 'Tokyo'

console.log(profile) 
// => { age: 23, id: 'TrpFrog', birthday: '2000-10-17', birthPlace: 'Tokyo' }
```

この例では `profile.birthday` と `profile.birthPlace` が遅延ロードされていることが分かります。

ということで、このような動作をする関数 **createLazyObject** を実装します。


### 実装

結論から述べると、以下のように実装します。

```js
export function createLazyObject(lazyObj) {
  const retObject = {}

  for (const [key, value] of Object.entries(lazyObj)) {
    if (key.startsWith('lazy_')) {
      const factoryFn = value
      const keyWithoutLazy = key.slice(5)

      Object.defineProperty(retObject, keyWithoutLazy, {
        get: () => {
          const evaluatedValue = factoryFn()
          Object.defineProperty(retObject, key, {
            value: evaluatedValue,
            writable: true,
            enumerable: true,
            configurable: true,
          })
          return evaluatedValue
        },
        enumerable: true,
        configurable: true,
      })
    } else {
      retObject[key] = value
    }
  }

  return retObject
}
```


この実装は以下のサイトを参考にして作成されました。

```link-embed
https://stackoverflow.com/questions/74201358/whatss-the-best-way-to-cache-a-getter-without-decorators
```

```link-embed
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/get#%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88_%E8%87%AA%E5%B7%B1%E6%9B%B8%E3%81%8D%E6%8F%9B%E3%81%88_%E9%81%85%E5%BB%B6%E3%82%B2%E3%83%83%E3%82%BF%E3%83%BC
```

<!-- window break -->

## TypeScript で型をつける

**今日の本題**です。JavaScript で型に怪しく (？) 実装するのは簡単でしたが、ここに型がつくとなると**急に難易度が跳ね上がります**。

なぜ難しいか？以下に型をつける際に考慮したい事項を並べてみます。

- `lazy_` があろうがなかろうが、戻り値に**正しい型**を付与したい
- `lazy_` つきプロパティと `lazy_` なしプロパティの**2つが同居してないか型レベルでチェック**したい
- `lazy_` つきプロパティにきちんと関数が渡されているかをチェックしたい
- **戻り値の型を指定**して、`createLazyObject` に渡すオブジェクトのバリデーションをしたい

すなわち次のようなことがしたいです。

### 戻り値への型の付与

```ts
const profile = createLazyObject({
  age: 23,
  id: 'TrpFrog',
  lazy_birthday: () => '2000-10-17',
  lazy_birthPlace: () => 'Tokyo',
})
// => { age: number, id: string, birthday: string, birthPlace: string }
```

### プロパティの重複チェック

```ts
const badProfile = createLazyObject({
  age: 23,
  // TypeError! // [!code error] (プロパティが重複している)
  lazy_birthday: () => fetchBirthday(),
  birthday: '2000-10-17',
})
```

### プロパティの過不足チェック

```ts
// TypeError! // [!code error] (プロパティが不足している, ここでは型を指定していることに注意)
const badProfile = createLazyObject<{ age: number, birthday: string }>({
  lazy_birthday: () => fetchBirthday(),
})

// TypeError! // [!code error] (プロパティが不足している)
const badProfile2 = createLazyObject<{ age: number, birthday: string }>({
  age: 23,
})

// OK (lazy_ はどれについていても良い)
const goodProfile = createLazyObject<{ age: number, birthday: string }>({
  lazy_age: () => 23,
  birthday: '2000-10-17',
})
```

### 引数の型チェック

```ts
const badProfile = createLazyObject<{
  id: string,
  age: number,
  birthday: string
}>({
  // TypeError! // [!code error] (lazy_ のときは関数を渡す必要がある)
  lazy_id: 'TrpFrog',
  // TypeError! // [!code error] (age には number を渡す必要がある)
  age: '23',
  // TypeError! // [!code error] (lazy_birthday は string を返す必要がある)
  lazy_birthday: () => 20001017,
})

// OK
const good = createLazyObject<{
  id: string,
  age: number,
  birthday: string
}>({
  lazy_id: () => 'TrpFrog',
  age: 23,
  lazy_birthday: () => '2000-10-17',
})
```

大変そうですよね！？これを実装するのがこの記事のゴールです。
たくさん、たくさん、TypeScript の型の機能を使って実装していきます。


## TypeScript を使った型レベルプログラミングの基礎

このままでは誰もこの記事について来れない、というレベルに**高度な**型の機能を使うので、簡単におさらいしていきましょう。

と言っても私は type-challenges の中級までしか解いたことがないので、もっとエレガントな方法があるかもしれません。その点はご了承ください。


<!-- window break -->

## オブジェクトから lazy_ を外す型

外す方を先にやるのかよ！と思ってしまいますが、先にこっちを作ってしまいます。
なぜならば、つける方には**闇**が待っているからです。


## 重複チェックをするユーティリティ型

ここでは `lazy_` とそうでないものが被っていないかをチェックする


## createLazyObject に型をつける (Easy)


<!-- window break -->

## ハードモード: 型を決めたい場合はどうすれば良い？


## 重複チェックついた lazy_ 付きの型 (型が決まっている場合)

`propertyName` と `lazy_propertyName` が重複しないようにするにはどうすれば良いでしょうか？
素直に考えれば次のようなパターンが思い付きます。

```titled-frame
素直なアイデア

- `a` または `lazy_a` のどちらか一方しか受け付けないオブジェクトの型
- `b` または `lazy_b` のどちらか一方しか受け付けないオブジェクトの型
- `c` または `lazy_c` のどちらか一方しか受け付けないオブジェクトの型
- 同様に続く……

を全て連結させた型を作る
```

このようなことは可能なのでしょうか？結論から言えば**可能**です。

### Intersection

TypeScript には **Intersection 型**というものがあります。

### どちらか一方しか受け付けない型

まずは問題を分解して「どちらか一方しか受け付けない型」`AcceptEither` を作ってみます。
すなわち、次のような型です。

```ts	
type AE = AcceptEither<'a', number, 'lazy_a', () => number> // [!code highlight]
const ex1: AE = { a: 10 } // [!code --]
const ex2: AE = { lazy_a: () => 10 } // [!code ++]
const ex3: AE = {} // TypeError! // [!code error]
const ex4: AE = { a: 10, lazy_a: () => 10 } // TypeError! // [!code warning]
```

これは以下のように実装できます。

```AcceptEither.ts
type AcceptEither<K1 extends string, V1, K2 extends string, V2> =
  | ({ [key in K1]: V1 } & { [key in K2]?: undefined })
  | ({ [key in K1]?: undefined } & { [key in K2]: V2 })
```

うねうね

### lazy を受け入れる型 (プロパティ版)

`LazyAbleProperty` を作成します。

```ts	
type AE = LazyAbleProperty<'a', number>
const ex1: AE = { a: 10 }
const ex2: AE = { lazy_a: () => 10 }
const ex3: AE = {} // TypeError! // [!code error]
const ex4: AE = { a: 10, lazy_a: () => 10 } // TypeError! // [!code error]
```

これは次のように実装できます。

```LazyAbleProperty.ts
type LazyAbleProperty<K extends string, V> =
  AcceptEither<K, V, `lazy_${K}`, () => V>
```

そのままですね。

この実装は `K` が `lazy_` 付きでないことを仮定しています。
`lazy_` が混ざる場合も考慮してみましょう。

```ts	
const ex1: LazyAbleProperty<'a', number> = { a: 10 }
const ex2: LazyAbleProperty<'lazy_a', () => number> = { a: 10 }
// TypeError! // [!code error] (lazy_a のときは関数型を渡さないといけない)
const ex3: LazyAbleProperty<'lazy_a', number> = { a: 10 }
```

以下のように実装できます。

```LazyAbleProperty.ts
type LazyAbleProperty<K extends string, V> = K extends `lazy_${infer U}`
  ? V extends () => infer R
    ? AcceptEither<U, R, K, V>
    : never
  : AcceptEither<K, V, `lazy_${K}`, () => V>
```

こんな感じになりました。`lazy_` 付きなのに関数が与えられないプロパティはルール違反なので `never` を返してやります。先ほどの例で `ex3` が TypeError になったのは `{a: 10}` が `never` に代入できないためなのですね。

勘の良い人はここで `LazyAbleProperty` を連結させればこれのオブジェクト版が作れると思ったことでしょう。やってみましょう。

```ts
type X = LazyAbleProperty<'a', number> & LazyAbleProperty<'b', string>
const ex1: X = { a: 10, b: 'hello' } // OK
const ex2: X = { a: 10, lazy_b: () => 'hello' } // OK
const ex3: X = { lazy_b: () => 'hello' } // TypeError! // [!code error]
const ex4: X = { a: 10, b: 'hello', lazy_b: () => 'hello' } // TypeError! // [!code error]
```

いい感じです。

しかし、今のままでは手動で `&` を使って連結させる必要があります。どうにか全てのプロパティを自動で良い感じに `&` 連結させる方法はないでしょうか？

実は、あります。`UnionToIntersection` を使います。

### Union to Intersection

`UnionToIntersection` は `{ a: number } | { b: string } | { c: object }` を `{ a: number } & { b: string } & { c: object }` に変換するテクニック、ユーティリティ型です。

```ts
type MyUnion = { a: number } | { b: string } | { c: object }
type MyIntersection = UnionToIntersection<MyUnion>
// => { a: number } & { b: string } & { c: object }
```

もちろん TypeScript 本体にこんな変な型は組み込まれていないので、自分で実装する必要があります。
次のように実装します。

```UnionToIntersection.ts
type UnionToIntersection<T> = (
  T extends any ? (k: T) => void : never
) extends ((k: infer I) => void) ? I : never;
```

**？？？**

とにかく、これを使うと Union を Intersection に変換できます。なぜこうなるのかは、こちらのサイトのコメントが分かりやすいのでぜひ読んでください。

```link-embed
https://qiita.com/suin/items/93eb9c328ee404fdfabc
```

簡単に説明すると

- Union を conditional types に突っ込むとバラけてくれる仕様
- 関数の Union は引数が Intersection になる仕様
- 型の一部分を取り出せる `infer`

を使ったユーティリティ型です。わけがわかりませんね

### lazy を受け入れる型 (オブジェクト版)

さて、`UnionToIntersection` の力を借りれば `LazyAbleProperty` のオブジェクト版、`LazyAbleObject` が作れます。ここで、

- オブジェクト `T` からその key として `K` を抜き出す
- key `K` と key に対応する値の型 `T[K]` を使って `LazyAbleProperty<T, T[K]>` を作る
  - これで lazy あり/なし のどちらかを受け入れる型ができますね
- `UnionToIntersection` に入れる

という方法が思いつくかもしれません。残念ながら、これは誤りです。実際にやってみましょう。

```ts
type WrongLazyAbleObject<T> = UnionToIntersection<
  keyof T extends infer K extends keyof T 
    ? LazyAbleProperty<K, T[K]> 
    : never
>
type Result = WrongLazyAbleObject<{ a: number, b: string }>
// => { a: number } & { lazy_a: () => number } & { b: string } & { lazy_b: () => string }
// (K?: undefined の部分は省略)
```

結果の型を見て分かったかもしれません。UnionToIntersection なので **LazyAbleProperty の返す Union も Intersection になる**のです。

これを回避するために UnionToIntersection をそのまま使うのではなく、**`LazyAbleProperty` 用に改造**する必要があります。

## createLazyObject に型をつける (Hard)


## Limitations

かなり頑張って実装しましたが、現状以下のような制約があります。

- lazy property として渡せる関数は同期関数のみです。
  - これは JavaScript の仕様的に仕方ないかもしれません。(プロパティの初回呼び出しが非同期になってしまう)
- 再帰的に `lazy_` を解決することはできません。
  - 逆にこれを許容すると、別のライブラリに `lazy_` の含まれるプロパティがあったとき苦しむことにはなりそうです。
  - 多分ですが、型の定義を再帰的にすればできるとは思います。興味を持った人はやってみてください。

## Special Thanks

















