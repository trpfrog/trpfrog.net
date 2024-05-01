import sharedConfig from '@trpfrog.net/config-tailwind'
import { withTV } from 'tailwind-variants/transformer'

export default withTV({
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [sharedConfig],
})
