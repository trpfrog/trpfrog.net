import styles from "../styles/top-page/AboutMe.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Block from "../components/Block";

import {
  faAt,
  faBirthdayCake,
  faCode,
  faEnvelope,
  faHeart,
  faLaptop,
  faMapMarkerAlt,
  faUniversity,
  faWalking
} from "@fortawesome/free-solid-svg-icons";

import {faGithub, faTwitter} from "@fortawesome/free-brands-svg-icons";

type Props = {
  id: string
}

const AboutMe = ({id}: Props) => {

  const attributes = [
    {icon: faMapMarkerAlt, text: '東京都 (23区外)'},
    {icon: faUniversity, text: '電気通信大学 4年'},
    {icon: faBirthdayCake, text: '2000年10月17日 (22歳)'},
    {icon: faHeart, text: 'コンピュータ / 開発 / 競プロ / 散歩'},
    {icon: faLaptop, text: 'Macユーザー'},
    {icon: faCode, text: 'AtCoder水色 (highest 1596)'},
    {icon: faWalking, text: '徒歩会 (farthest 70.5km)'},
  ]

  return (
    <Block id={id}>
      <div id={styles.my_name}>
        <p>
          <span id={styles.my_name_jp}>つまみ</span>
          <span id={styles.my_name_en}>TrpFrog</span>
        </p>
      </div>

      <p id={styles.intro_text}>
        ふにゃ〜
      </p>

      <ul id={styles.intro_attribute}>
        {attributes.map(({icon, text}) => (
          <li key={text}>
            <FontAwesomeIcon icon={icon} style={{width: '1.5em'}}/> {text}
          </li>
        ))}
      </ul>

      <div id={styles.social}>
        <div>
          <FontAwesomeIcon icon={faTwitter}/>{' '}
          <a href={'https://twitter.com/TrpFrog'}>TrpFrog</a>
        </div>
        <div>
          <FontAwesomeIcon icon={faGithub}/>{' '}
          <a href={'https://github.com/TrpFrog'}>TrpFrog</a>
        </div>
        <div>
          <FontAwesomeIcon icon={faEnvelope}/>{' '}
          dev<FontAwesomeIcon icon={faAt} style={{fontSize: '0.9em'}}/>trpfrog.net
        </div>
      </div>
    </Block>
  )
}

export default AboutMe
