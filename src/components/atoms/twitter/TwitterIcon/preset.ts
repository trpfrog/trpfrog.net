import React from 'react'

const trpfrogUrl =
  'https://res.cloudinary.com/trpfrog/image/upload/w_50,q_auto/icons_gallery/28'

const palette = {
  azukibarStick: '248, 218, 192',
  azukibarColor: '208, 138, 136',
  ebioishiiUColor: '#cc986d',
  negiiseiColor: '#29ab15',
}

export const iconPreset: Record<string, React.CSSProperties['background']> = {
  trpfrog: `url(${trpfrogUrl})`,
  azukibar_d: `
        linear-gradient(
            180deg, 
            rgba(${palette.azukibarColor},0) 32%, 
            rgba(${palette.azukibarColor},1) 32%
        ),
        linear-gradient(
            90deg,
            rgba(255,255,255,1) 38.5%,
            rgb(${palette.azukibarStick}) 38.5%,
            rgb(${palette.azukibarStick}) 62%,
            rgba(255,255,255,1) 62%
        )`,
  kyu_099: 'darkred',
  _nil_a_: 'linen',
  fmnpt: 'mediumvioletred',
  lupicure20: 'rgb(195, 220, 249)',
  sakuramochi0708: 'rgb(250, 216, 255)',
  ebioishii_u: `
        radial-gradient(circle at 40% 35%, black 0%, black 3%, transparent 3%, transparent 100%),
        radial-gradient(circle at 60% 35%, black 0%, black 3%, transparent 3%, transparent 100%),
        conic-gradient(from 135deg at 50% 1%, transparent 0deg, transparent 90deg, #f2f2f2 90deg, #f2f2f2 180deg),
        linear-gradient(to bottom, #f2f2f2 0%, #f2f2f2 15%, transparent 15%, transparent 100%),
        linear-gradient(to right, #f2f2f2 0%, #f2f2f2 24%, transparent 24%, transparent 76%, #f2f2f2 76%, #f2f2f2 100%),
        conic-gradient(
            from 180deg at 33% 72%,
            ${palette.ebioishiiUColor} 0deg,
            ${palette.ebioishiiUColor} 45deg,
            #f2f2f2 45deg,
            #f2f2f2 135deg,
            ${palette.ebioishiiUColor} 135deg,
            ${palette.ebioishiiUColor} 180deg,
            transparent 180deg
        ),
        conic-gradient(
            from 0deg at 67% 72%,
            ${palette.ebioishiiUColor} 0deg,
            ${palette.ebioishiiUColor} 45deg,
            #f2f2f2 45deg,
            #f2f2f2 135deg,
            ${palette.ebioishiiUColor} 135deg,
            ${palette.ebioishiiUColor} 180deg,
            transparent 180deg
        ),
        linear-gradient(
            to right,
            ${palette.ebioishiiUColor} 0%,
            ${palette.ebioishiiUColor} 43%,
            transparent 43%,
            transparent 57%,
            ${palette.ebioishiiUColor} 57%,
            ${palette.ebioishiiUColor} 100%
        ),
        linear-gradient(to bottom, transparent 0%, transparent 60%, black 60%, black 61.5%, transparent 61.5%, transparent 100%),
        ${palette.ebioishiiUColor}
  `,
  degui_3bitto: 'khaki',
  negiissei: palette.negiiseiColor,
}
