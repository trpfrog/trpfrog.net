import React from "react";
import styles from "./index.module.scss";
import {useAtom} from "jotai";
import {mobileMenuAtom} from "../MobileMenu";

const Hamburger = () => {
  const [isOpened, setHamburgerState] = useAtom(mobileMenuAtom)
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

export default Hamburger
