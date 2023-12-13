import { get } from '@vercel/edge-config'

import {
  TRPFROG_DIFFUSION_DEFAULT_UPDATE_HOURS,
  TRPFROG_DIFFUSION_UPDATE_HOURS_EDGE_CONFIG_KEY,
} from '@/lib/constants'

export async function Description() {
  const updateHours =
    (await get<number>(TRPFROG_DIFFUSION_UPDATE_HOURS_EDGE_CONFIG_KEY)) ??
    TRPFROG_DIFFUSION_DEFAULT_UPDATE_HOURS

  return (
    <small style={{ fontSize: '0.6em', textAlign: 'center' }}>
      <div>
        これは AI により自動生成された画像です。
        <br />
        最後の生成から{updateHours}
        時間経つと再生成されます。
      </div>
      <div>
        Powered by{' '}
        <a href={'https://huggingface.co/Prgckwb/trpfrog-diffusion'}>
          Prgckwb/trpfrog-diffusion
        </a>
      </div>
    </small>
  )
}
