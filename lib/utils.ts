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
}

export default Util
