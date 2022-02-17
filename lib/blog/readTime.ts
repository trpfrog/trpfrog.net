export const getReadTimeSecond = (markdown: string) => {
    const imageRegex = new RegExp('\!\\[(.*?)\]\\(.*?\\)', 'g')
    const linkRegex = new RegExp('\\[(.*?)\]\\(.*?\\)', 'g')
    const linkRemoved = markdown.replace(imageRegex, '').replace(linkRegex, '$1')
    const codeRemoved = linkRemoved.split('```').filter((e, index) => index % 2 == 0).join()
    return Math.floor(codeRemoved.length * 60 / 700);
}

export const formatReadTime = (readTimeSec: number) => {
    let readMin = Math.floor(readTimeSec / 60)
    let readSec = Math.round((readTimeSec % 60) / 10) * 10
    if (readSec === 60) {
        readMin++;
    }
    return {
        minutes: readMin.toString(),
        seconds: readSec !== 0 ? readTimeSec.toString() : '00'
    }
}
