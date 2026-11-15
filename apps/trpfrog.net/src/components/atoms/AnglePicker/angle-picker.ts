import { bindDrag, createChange, definePrimitive, type ChangeDetails } from '@ui-sdk/core'
import { stepBy, stepFromKey, wrap } from '@ui-sdk/core/number'

export type AnglePickerChangeReason =
  | 'track-press'
  | 'drag'
  | 'step-key'
  | 'accessibility-adjust'
  | 'imperative'

export interface AnglePickerOptions {
  defaultDegree?: number
  onDegreeChange?: (degree: number, details: ChangeDetails<AnglePickerChangeReason>) => void
}

// 範囲の端で止まらず回り込めるように、境界を 1 周ぶん外に置いて最後に wrap する。
// Home と End はどちらも 0° になる
const KEY_RANGE = { min: -360, max: 720, step: 5, largeStep: 45 }

// ダイヤルの中心から見た (x, y) の向き。12 時が 0° で、時計回りに増える
function degreeAt(el: HTMLElement, x: number, y: number) {
  const rect = el.getBoundingClientRect()
  const dx = x - (rect.left + rect.width / 2)
  const dy = y - (rect.top + rect.height / 2)
  return (Math.atan2(dy, dx) + Math.PI / 2) * (180 / Math.PI)
}

export const anglePicker = definePrimitive({
  name: 'angle-picker',
  options: { defaultDegree: 'number', onDegreeChange: 'callback' },
  state: (options: AnglePickerOptions) => ({ degree: options.defaultDegree ?? 0 }),
  api: context => {
    const change = createChange(context)
    return {
      setDegree: (
        degree: number,
        details: { reason: AnglePickerChangeReason; event?: Event } = { reason: 'imperative' },
      ) => change('degree', degree, details),
    }
  },
  slots: slot => ({
    // ダイヤル全体。押した向きに針を向け、指やボタンを離すまで追いかける
    root: slot<{}, { degree: number }>({
      state: state => ({ degree: state.degree }),
      on: {
        pointerdown: (event, { el, api }) => {
          const down = event as PointerEvent
          // 2 本目の指は無視して、針を取り合わないようにする
          if (!el || down.button !== 0 || !down.isPrimary) return
          api.setDegree(degreeAt(el, down.clientX, down.clientY), {
            reason: 'track-press',
            event: down,
          })
          bindDrag(el, down, {
            onMove: ({ x, y }) => api.setDegree(degreeAt(el, x, y), { reason: 'drag' }),
            onEnd: () => {},
          })
        },
      },
    }),
    // キーボード操作と読み上げを受け持つ、見えない range 入力
    input: slot({
      role: 'slider',
      focus: 'native',
      keys: [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'PageUp',
        'PageDown',
        'Home',
        'End',
      ],
      attrs: state => {
        const value = Math.round(wrap(state.degree, 0, 360))
        return {
          type: 'range',
          min: '0',
          max: '360',
          step: String(KEY_RANGE.step),
          value: String(value),
          'aria-valuenow': String(value),
          'aria-valuetext': `${value}°`,
        }
      },
      on: {
        keydown: (event, { store, api }) => {
          const key = event as KeyboardEvent
          const move = stepFromKey(key)
          if (!move) return
          key.preventDefault()
          const current = wrap(Math.round(store.get().degree), 0, 360)
          api.setDegree(wrap(stepBy(current, move, KEY_RANGE), 0, 360), {
            reason: 'step-key',
            event: key,
          })
        },
        // スクリーンリーダーが値を直接変えたとき
        input: (event, { api }) => {
          const value = Number((event.target as HTMLInputElement).value)
          api.setDegree(wrap(value, 0, 360), { reason: 'accessibility-adjust', event })
        },
      },
    }),
  }),
  agent: { actions: ['setDegree'] },
})
