import React from "react";
import styles from "../../styles/common/MobileMenu.module.scss";
import {NavigationLinks} from "../Navigation";

export type HamburgerState = [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
]

type Props = {
    hamburgerState: HamburgerState
}

const MobileMenu = ({hamburgerState}: Props) => {
  const [isOpened, setHamburgerState] = hamburgerState
  const toggleMenu = () => {
    setHamburgerState(!isOpened);
  }
  const doNothing = () => {};

  return (
    <section id={styles.mobile_menu}>
      <aside
        id={styles.menu_background}
        onClick={isOpened ? toggleMenu : doNothing}
        data-menu-opened={isOpened}
      />
      <aside id={styles.side_menu} data-menu-opened={isOpened}>
        <div id={styles.side_header}/>
        <div id={styles.side_links} onClick={toggleMenu}>
          <NavigationLinks />
        </div>
      </aside>
    </section>
  );
}

export default MobileMenu
