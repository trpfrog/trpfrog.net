import assert from "assert";

const Util = {
  clamp: (x: number, min: number, max: number): number => {
    assert(min <= max)
    if (x < min) return min
    if (x > max) return max
    return x
  },

  getTextWidth: (text: string, font: string) => {
    if (typeof window === 'undefined') return 0;
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.font = font || getComputedStyle(document.body).font;
    return context.measureText(text).width;
  },

  calcMonospacedTextWidth: (text: string): number => {
    // Consider ASCII figures and half-width kana as half-width figures
    const doubledSizes = text
      .replace(/[\x20-\x7e ｦ-ﾟ]/g, '')
      .length
    return text.length + doubledSizes
  },

  sortWithDates: (a: `${number}/${number}/${number}`, b: `${number}/${number}/${number}`) =>{
    const aDate = a.split('/').map(Number) as [number, number, number]
    const bDate = b.split('/').map(Number) as [number, number, number]
    if (aDate[0] !== bDate[0]) {
      return bDate[0] - aDate[0]
    }
    if (aDate[1] !== bDate[1]) {
      return bDate[1] - aDate[1]
    }
    return bDate[2] - aDate[2]
  },
}

export default Util
