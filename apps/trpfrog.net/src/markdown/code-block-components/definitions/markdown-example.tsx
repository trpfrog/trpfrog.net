import { HideIfTooShort } from '@/components/atoms/HideIfHeightIsZero'
import { CodeBlock } from '@/components/molecules/CodeBlock'

import { CustomCodeBlockComponent } from '../types'

export const markdownExampleCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown, Render }) => {
    return (
      <div className="tw-grid tw-grid-cols-1 tw-gap-2">
        <CodeBlock language="markdown" fileName="Input">
          {markdown}
        </CodeBlock>
        <HideIfTooShort eps={5}>
          <div className="tw-rounded-lg tw-border tw-border-trpfrog-500">
            <Render markdown={markdown} />
          </div>
        </HideIfTooShort>
      </div>
    )
  },
}
