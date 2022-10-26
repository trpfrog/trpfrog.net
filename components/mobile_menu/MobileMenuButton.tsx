import React from "react";
import styles from "../../styles/common/MobileMenuButton.module.scss";
import {HamburgerState} from "./MobileMenu";

type Props = {
    hamburgerState: HamburgerState
}

const MobileMenuButton = ({hamburgerState}: Props) => {
  const [isOpened, setHamburgerState] = hamburgerState
  return (
    <div id={styles.hamburger_menu}>
      <a
        id={styles.menu_trigger}
        onClick={() => setHamburgerState(!isOpened)}
        data-menu-opened={isOpened}
      >
        <span/><span/><span/> {/* Hamburger Icon in CSS */}
      </a>
    </div>
  );
}

export default MobileMenuButton
