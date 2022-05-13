import assert from "assert";

namespace Util {
    export const clamp = (x: number, min: number, max: number): number => {
        assert(min <= max)
        if (x < min) return min
        if (x > max) return max
        return x
    }
}

export default Util
