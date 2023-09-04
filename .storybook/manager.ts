import { addons } from '@storybook/manager-api'
import * as trpFrogTheme from './TrpFrogTheme'

addons.setConfig({
  theme: trpFrogTheme.light,
})
