import React from 'react'

import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faAt, faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  additionalAttributes,
  attributes,
} from '@/app/(home)/_components/AboutMe/attributes'
import KCommandBox from '@/app/(home)/_components/AboutMe/KCommandBox'

import Block from '@/components/molecules/Block'

import styles from './index.module.scss'

type Props = {
  id: string
}

const AboutMe = ({ id }: Props) => {
  return (
    <Block id={id}>
      <div className={styles.my_name}>
        <p>
          <span className={styles.my_name_jp}>つまみ</span>
          <span className={styles.my_name_en}>TrpFrog</span>
        </p>
      </div>

      <p className={styles.intro_text}>ふにゃ〜</p>

      <ul className={styles.intro_attribute}>
        {attributes.map(({ icon, iconName, text }) => (
          <li key={text} className={styles.attr_item}>
            <span>
              <FontAwesomeIcon
                icon={icon}
                title={iconName}
                style={{ width: '1.5em', display: 'inline-block' }}
              />
            </span>
            <span style={{ display: 'inline-block' }}>{text}</span>
          </li>
        ))}
      </ul>
      <KCommandBox>
        <h3>
          <FontAwesomeIcon icon={faHeart} /> {"Otaku's favorite"}
        </h3>
        <ul className={styles.intro_attribute}>
          {additionalAttributes.map(({ icon, text, iconName }) => (
            <li key={text} className={styles.attr_item}>
              <span>
                <FontAwesomeIcon
                  icon={icon}
                  style={{ width: '1.5em', display: 'inline-block' }}
                />
              </span>
              <span style={{ display: 'inline-block' }}>
                <strong>{iconName}</strong>
                <br />
                {text}
              </span>
            </li>
          ))}
        </ul>
      </KCommandBox>

      <div className={styles.social}>
        <div>
          <FontAwesomeIcon icon={faTwitter} />{' '}
          <a href={'https://twitter.com/TrpFrog'}>TrpFrog</a>
        </div>
        <div>
          <FontAwesomeIcon icon={faGithub} />{' '}
          <a href={'https://github.com/TrpFrog'}>TrpFrog</a>
        </div>
        <div>
          <FontAwesomeIcon icon={faEnvelope} /> dev
          <FontAwesomeIcon icon={faAt} style={{ fontSize: '0.9em' }} />
          trpfrog.net
        </div>
      </div>
    </Block>
  )
}

export default AboutMe
