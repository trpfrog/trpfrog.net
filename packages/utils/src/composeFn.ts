/* eslint-disable @typescript-eslint/no-explicit-any */

// 基本的な型の定義
type AnyFunc = (arg: any) => any

// 合成可能性のチェック
type IsComposable<F extends AnyFunc, G extends AnyFunc> =
  ReturnType<G> extends Parameters<F>[0] ? true : false

// 2つの関数を合成する型
type ComposeTwo<F extends AnyFunc, G extends AnyFunc> =
  IsComposable<F, G> extends true
    ? (arg: Parameters<G>[0]) => ReturnType<F>
    : 'Error: cannot compose'

// 再帰的な関数合成型
type ComposeAll<Fns extends AnyFunc[]> = Fns extends [infer F]
  ? F extends AnyFunc
    ? F
    : never
  : Fns extends [...infer Rest, infer Last]
    ? Last extends AnyFunc
      ? ComposeAll<Rest extends AnyFunc[] ? Rest : never> extends infer RestComposed extends AnyFunc
        ? ComposeTwo<RestComposed, Last>
        : never
      : never
    : never

// 最終的な Compose 型
type Compose<Fns extends AnyFunc[]> = ComposeAll<Fns>

// composeFunctions の実装
export function composeFunctions<Fns extends AnyFunc[]>(...fns: Fns): Compose<Fns> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- 型パズルの都合で any を使う
  return ((x: any) => fns.reduceRight((v, f) => f(v), x)) as Compose<Fns>
}

// Reverse 型の定義（pipeFunctions 用）
type Reverse<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...Reverse<Rest>, First]
  : []

// pipeFunctions の実装
export function pipeFunctions<Fns extends AnyFunc[]>(...fns: Fns): Compose<Reverse<Fns>> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- 型パズルの都合で any を使う
  return ((x: any) => fns.reduce((v, f) => f(v), x)) as Compose<Reverse<Fns>>
}
