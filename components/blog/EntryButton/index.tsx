import styles from "./index.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export default function EntryButton (
  props: { text: string, icon: IconProp, onClick?: any }
) {
  return (
    <div className={styles.entry_button} onClick={props.onClick}>
      <div className={styles.entry_button_icon}>
        <FontAwesomeIcon icon={props.icon}/>
      </div>
      <span className={styles.entry_button_text}>
        {props.text}
      </span>
    </div>
  )
}
