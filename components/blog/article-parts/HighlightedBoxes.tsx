import styles from "../../../styles/blog/blog.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFrog, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {ArticleParts, parseRichMarkdown} from "../BlogMarkdown";

export const Caution: ArticleParts = content => (
  <div className={styles.caution}>
    <div className={styles.text_box_icon}>
      <FontAwesomeIcon icon={faTriangleExclamation}/>
    </div>
    <div className={styles.text_box_content}>
      <h4>注意！</h4>
      {parseRichMarkdown(content)}
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
