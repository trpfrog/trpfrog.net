'use client'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/Tooltip'
import { A } from '@/components/wrappers'

export function CodeLinkButton(props: { url: string }) {
  const isGitHub = /https?:\/\/github.com/.test(props.url)
  return (
    <Tooltip type="label">
      <TooltipTrigger
        render={
          <A
            openInNewTab
            href={props.url}
            className="tw:grid tw:place-items-center tw:text-white tw:opacity-50 tw:hover:opacity-100"
          />
        }
      >
        <FontAwesomeIcon icon={isGitHub ? faGithub : faLink} />
      </TooltipTrigger>
      <TooltipContent>{isGitHub ? 'Open on GitHub' : 'View Code'}</TooltipContent>
    </Tooltip>
  )
}
