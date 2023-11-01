export const formatReadTime = (readTimeSec: number) => {
  let readMin = Math.floor(readTimeSec / 60)
  let readSec = Math.round((readTimeSec % 60) / 10) * 10
  if (readSec === 60) {
    readSec = 0
    readMin++
  }

  return {
    minutes: readMin.toString(),
    seconds: readSec !== 0 ? readSec.toString() : '00',
  }
}
