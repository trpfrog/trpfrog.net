import styles from './index.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFrog,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import ArticleRenderer from '@/app/blog/_renderer/ArticleRenderer'
import { IsomorphicArticleParts } from '../../ArticleParts'

export const Caution: IsomorphicArticleParts = ({
  content,
  entry,
  imageSize,
}) => (
  <div className={styles.caution}>
    <div className={styles.text_box_icon}>
      <FontAwesomeIcon icon={faTriangleExclamation} />
    </div>
    <div className={styles.text_box_content}>
      <h4>{content.split('\n')[0]}</h4>
      <ArticleRenderer
        toRender={content.split('\n').slice(1).join('\n').trim()}
        entry={entry}
        imageSize={imageSize}
      />
    </div>
  </div>
)

export const Infobox: IsomorphicArticleParts = ({
  content,
  entry,
  imageSize,
}) => (
  <div className={styles.infobox}>
    <div className={styles.text_box_icon}>
      <FontAwesomeIcon icon={faFrog} />
    </div>
    <div className={styles.text_box_content}>
      <h4>{content.split('\n')[0]}</h4>
      <ArticleRenderer
        toRender={content.split('\n').slice(1).join('\n').trim()}
        entry={entry}
        imageSize={imageSize}
      />
    </div>
  </div>
)

export const TitledFrame: IsomorphicArticleParts = ({
  content,
  entry,
  imageSize,
}) => {
  const [title, ...lines] = content.split('\n')
  return (
    <div style={{ transform: 'translateY(calc(-1 * (1em + 5px) / 2))' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            borderRadius: 100,
            border: '3px solid var(--header-color)',
            background: 'var(--window-bkg-color)',
            fontWeight: 'bold',
            padding: '2px 15px',
            transform: 'translateY(calc(1em + 5px))',
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          border: '3px solid var(--header-color)',
          padding: '1.5em 1em 1em',
          borderRadius: 10,
        }}
      >
        <ArticleRenderer
          toRender={lines.join('\n')}
          entry={entry}
          imageSize={imageSize}
        />
      </div>
    </div>
  )
}
