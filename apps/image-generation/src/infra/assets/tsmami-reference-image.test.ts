import { describe, expect, it } from 'vite-plus/test'

import { tsmamiReferenceImageBase64 } from './tsmami-reference-image'

describe('tsmamiReferenceImageBase64', () => {
  it('is a base64-encoded PNG', () => {
    const bytes = Uint8Array.from(atob(tsmamiReferenceImageBase64.slice(0, 8)), c =>
      c.charCodeAt(0),
    )
    // PNG のシグネチャ
    expect(bytes.slice(0, 4)).toEqual(new Uint8Array([0x89, 0x50, 0x4e, 0x47]))
  })
})
