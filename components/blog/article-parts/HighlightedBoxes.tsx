import styles from "../../../styles/blog/blog.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFrog, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {parseRichMarkdown} from "../BlogMarkdown";
import {ArticleParts} from "../../../lib/blog/articleParts";

export const Caution: ArticleParts = content => (
  <div className={styles.caution}>
    <div className={styles.text_box_icon}>
      <FontAwesomeIcon icon={faTriangleExclamation}/>
    </div>
    <div className={styles.text_box_content}>
      <h4>{content.split('\n')[0]}</h4>
      {parseRichMarkdown(content.split('\n').slice(1).join('\n').trim())}
    </div>
  </div>
)

export const Infobox: ArticleParts = content => (
  <div className={styles.infobox}>
    <div className={styles.text_box_icon}>
      <FontAwesomeIcon icon={faFrog}/>
    </div>
    <div className={styles.text_box_content}>
      <h4>{content.split('\n')[0]}</h4>
      {parseRichMarkdown(content.split('\n').slice(1).join('\n').trim())}
    </div>
  </div>
)

export const TitledFrame: ArticleParts = content => {
  const [title, ...lines] = content.split('\n');
  return (
    <div style={{transform: 'translateY(calc(-1 * (1em + 5px) / 2))'}}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
          borderRadius: 100,
          border: '3px solid var(--header-color)',
          background: 'var(--window-bkg-color)',
          fontWeight: 'bold',
          padding: '2px 15px',
          transform: 'translateY(calc(1em + 5px))'
        }}>{title}</div>
      </div>
      <div style={{
        border: '3px solid var(--header-color)',
        padding: '1.5em 1em 1em',
        borderRadius: 10
      }}>
        {parseRichMarkdown(lines.join('\n'))}
      </div>
    </div>
  )
}
