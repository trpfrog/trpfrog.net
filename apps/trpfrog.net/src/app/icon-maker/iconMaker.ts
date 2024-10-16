import { RefObject } from 'react'

export const ICON_SIZE = 500,
  CIRCLE_SIZE = 430

export class IconCanvas {
  canvasRef: RefObject<HTMLCanvasElement | null>
  x: number = 35
  y: number = 0
  w: number = 0
  h: number = 0
  angle: number = 0

  images?: {
    face: HTMLImageElement
    mask: HTMLImageElement
  }

  constructor(canvasRef: RefObject<HTMLCanvasElement | null>) {
    this.canvasRef = canvasRef
    if (typeof window !== 'undefined') {
      this.images = {
        face: new Image(),
        mask: new Image(),
      }
    }
  }

  async upload(files: FileList | null) {
    if (!this.images) {
      throw new Error('images is not initialized')
    }

    if (files == null) return
    if (this.canvasRef.current == null) return

    const canvas = this.canvasRef.current
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const reader = new FileReader()

    // initialize
    this.x = 35
    this.y = 10
    this.w = this.h = this.angle = 0

    reader.readAsDataURL(files[0])
    const event = await new Promise<ProgressEvent<FileReader>>(resolve => {
      reader.onload = e => resolve(e)
    })

    // wait for loading
    await Promise.all([
      new Promise(resolve => {
        if (this.images && typeof event.target?.result === 'string') {
          this.images.face.src = event.target?.result
          this.images.face.addEventListener('load', resolve)
        }
      }),
      new Promise(resolve => {
        if (this.images) {
          this.images.mask.src = '/images/icon_maker/mask.png'
          this.images.mask.addEventListener('load', resolve)
        }
      }),
    ])

    if (this.images.face.width < this.images.face.height) {
      const ratio = this.images.face.height / this.images.face.width
      this.w = CIRCLE_SIZE
      this.h = CIRCLE_SIZE * ratio
    } else {
      const ratio = this.images.face.width / this.images.face.height
      this.w = CIRCLE_SIZE * ratio
      this.h = CIRCLE_SIZE
    }

    canvas.width = ICON_SIZE
    canvas.height = ICON_SIZE

    context.save()
    context.drawImage(this.images.face, 35, 10, this.w, this.h)
    context.restore()

    context.save()
    context.drawImage(this.images.mask, 0, 0, ICON_SIZE, ICON_SIZE)
    context.restore()
  }

  moveImage(dx: number, dy: number) {
    const c = Math.cos((this.angle * Math.PI) / 180)
    const s = Math.sin((this.angle * Math.PI) / 180)
    this.x += c * dx + s * dy
    this.y += c * dy - s * dx
    this.applyCanvas()
  }

  rotateImage(angle: number) {
    this.angle += angle
    this.applyCanvas()
  }

  scaleImage(magnification: number) {
    this.x -= (this.w * (magnification - 1)) / 2.0
    this.y -= (this.h * (magnification - 1)) / 2.0
    this.w *= magnification
    this.h *= magnification
    this.applyCanvas()
  }

  applyCanvas() {
    if (this.canvasRef.current == null || !this.images) return

    const canvas = this.canvasRef.current
    const context = canvas.getContext('2d') as CanvasRenderingContext2D

    context.beginPath()

    canvas.width = ICON_SIZE
    canvas.height = ICON_SIZE

    context.save()
    context.translate(ICON_SIZE / 2.0, ICON_SIZE / 2.0)
    context.rotate((this.angle * Math.PI) / 180)
    context.translate(-ICON_SIZE / 2.0, -ICON_SIZE / 2.0)
    context.drawImage(this.images.face, this.x, this.y, this.w, this.h)
    context.restore()

    context.save()
    context.drawImage(this.images.mask, 0, 0, ICON_SIZE, ICON_SIZE)
    context.restore()
  }

  writeImage() {
    if (typeof window === 'undefined') return
    if (this.canvasRef.current == null) return

    const canvas = this.canvasRef.current
    const resImg = canvas.toDataURL()
    const result = document.getElementById('result-image') as HTMLImageElement
    result.src = resImg
    window.location.hash = 'result'
  }
}
