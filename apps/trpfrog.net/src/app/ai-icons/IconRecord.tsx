import { useId } from 'react'

import { faClock, faImage, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regex } from 'arkregex'
import { format } from 'date-fns'

import { InlineLink } from '@/components/atoms/InlineLink'
import { PlainBlock } from '@/components/atoms/PlainBlock'
import { twJoin, twMerge } from '@/lib/tailwind'

function Prompt(props: { prompt: string; translated: string; id: string }) {
  return (
    <div className="tw:flex tw:flex-col tw:justify-center tw:pc:gap-2" id={props.id}>
      <div
        className={twJoin(
          'tw:bg-linear-to-br tw:from-blue-400 tw:to-pink-400 tw:bg-clip-text tw:text-transparent',
          'tw:font-black tw:italic tw:text-2xl tw:leading-[1.1] tw:sp:text-sm tw:sp:leading-[1.1] tw:py-2',
        )}
      >
        {props.prompt}
      </div>
      <div className="tw:text-xs tw:opacity-60">{props.translated}</div>
    </div>
  )
}

function MetadataWrapper(props: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('tw:text-xs tw:opacity-60 tw:flex tw:gap-4', props.className)}>
      {props.children}
    </div>
  )
}

function MetadataRecord(props: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="tw:inline-flex tw:gap-1 tw:items-center">
      {props.icon}
      {props.children}
    </span>
  )
}

const huggingFaceModelNameRegex = regex('^[^/\\s]+/[^/\\s]+$')

function getModelReferenceUrl(modelName: string): string | undefined {
  if (modelName.startsWith('gemini-')) {
    return 'https://ai.google.dev/gemini-api/docs/models'
  }
  if (huggingFaceModelNameRegex.test(modelName)) {
    return `https://huggingface.com/${modelName}`
  }
  return undefined
}

export function IconRecord(props: {
  src: string
  prompt: string
  translated: string
  promptAuthor: string
  imageModelName: string
  createdAt: string
}) {
  const promptAreaId = useId()
  const modelReferenceUrl = getModelReferenceUrl(props.imageModelName)

  return (
    <PlainBlock className="tw:p-[5px]">
      <div className="tw:flex tw:gap-[5px]">
        <img
          src={props.src}
          alt="AI生成されたつまみさんのアイコン"
          aria-describedby={promptAreaId}
          className="tw:size-[300px] tw:sp:size-[30vw] tw:rounded-[calc(var(--window-border-radius)-5px)]"
        />
        <div className="tw:flex tw:flex-col tw:justify-between tw:pc:px-4 tw:pc:py-2">
          <MetadataWrapper>
            <MetadataRecord icon={<FontAwesomeIcon icon={faClock} />}>
              {format(props.createdAt, 'yyyy-MM-dd HH:mm:ss')}
            </MetadataRecord>
          </MetadataWrapper>
          <Prompt prompt={props.prompt} translated={props.translated} id={promptAreaId} />
          <MetadataWrapper className="tw:sp:hidden">
            <MetadataRecord icon={<FontAwesomeIcon icon={faPencil} />}>
              {props.promptAuthor}
            </MetadataRecord>
            <MetadataRecord icon={<FontAwesomeIcon icon={faImage} />}>
              {modelReferenceUrl ? (
                <InlineLink href={modelReferenceUrl}>{props.imageModelName}</InlineLink>
              ) : (
                props.imageModelName
              )}
            </MetadataRecord>
          </MetadataWrapper>
        </div>
      </div>
    </PlainBlock>
  )
}
