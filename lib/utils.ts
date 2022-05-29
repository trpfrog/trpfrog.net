import assert from "assert";
import {useEffect, useState} from "react";

const Util =  {
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
    }
}

export default Util
