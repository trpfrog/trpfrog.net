import { style } from '@vanilla-extract/css'

const rootImagePaths = '/images/balloon'
const balloonColors = ['blue', 'green', 'orange'] as const

export const balloon = style({
  cursor: 'crosshair',
  display: 'inline-flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',

  selectors: {
    '&[data-broken-balloon="true"]': {
      backgroundImage: `url('${rootImagePaths}/broken.png')`,
      cursor: 'default',
    },
    '&[data-broken-balloon="false"]': {
      content: "''",
      ...Object.fromEntries(
        balloonColors.flatMap(color => [
          [
            `&[data-balloon-color="${color}"]`,
            {
              backgroundImage: `url('${rootImagePaths}/${color}/normal.png')`,
            },
          ],
          [
            `&[data-balloon-color="${color}"]:hover`,
            {
              backgroundImage: `url('${rootImagePaths}/${color}/tremble.gif')`,
            },
          ],
        ]),
      ),
    },
  },
})
