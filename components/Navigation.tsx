import Link from 'next/link'
import React from "react";
import {useRouter} from "next/router";
import styles from '../styles/common/Navigation.module.scss';

export const NAVIGATION_LINKS = [
  {link: '/', name: 'Home'},
  {link: '/works', name: 'Works'},
  {link: '/blog', name: 'Blog'},
  {link: '/balloon', name: 'Balloons'},
  {link: '/environment', name: 'Env'},
  {link: '/stickers', name: 'Stickers'},
  {link: '/icons', name: 'Icons'},
  {link: '/links', name: 'Links'},
  {link: '/download', name: 'DLC'},
  {link: '/icon-maker', name: 'Maker'},
  {link: '/walking', name: 'Walk'}
]

export const NavigationLinks = () => {
  const router = useRouter();
  const currentLink = router.pathname.split('/').slice(0, 2).join('/');

  return <>{
    NAVIGATION_LINKS.map(({link, name}) => (
      <Link href={link} key={link}>
        <a
          className={styles.side_menu_link}
          data-current-page={currentLink === link}
        >{name}</a>
      </Link>
    ))
  }</>
}

const Navigation = () => {

  return (
    <>
      <nav id={styles.wide_nav}>
        <div id={styles.wide_nav_wrapper}>
          <NavigationLinks/>
        </div>
      </nav>
    </>
  );
}

export default Navigation;

