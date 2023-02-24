import {useEffect, useState} from "react";
import {useScroll} from "framer-motion";
import {usePathname} from "next/navigation";
import Link from "next/link";
import styles from "../../styles/common/Header.module.scss";

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const extractTitle = (pathname: string) => {
  const rawPageTitle =
    typeof document !== 'undefined'
      ? document.title
      : process.env.title as string

  let pageTitle = rawPageTitle.split(' - ')[0]
  let subTitle = '';

  // Get article title
  if (pathname.startsWith('/blog/')) {
    subTitle = pageTitle
    pageTitle = 'つまみログ';
  }

  return {
    pageTitle, subTitle
  }
}

export const NormalTitle = () => {
  const [showPageTitle, setShowPageTitle] = useState(false);

  const [heightToChangeTitle, setHeightToChangeTitle] = useState(250)
  useEffect(() => setHeightToChangeTitle(window.innerWidth <= 800 ? 120 : 250), [])

  const handleScroll = (y: number) => {
    setShowPageTitle(y > heightToChangeTitle);
  }

  const {scrollY} = useScroll()
  scrollY.onChange(handleScroll)

  const pathname = usePathname()
  const {pageTitle, subTitle} = extractTitle(pathname)

  const [pageTitleElement, setPageTitleElement] = useState(<>{process.env.title}</>)
  useEffect(() => {
    setPageTitleElement(
      <div className={styles.on_subtitle_showed}>
        {pageTitle}<br/>
        <div id={styles.subtitle}>{subTitle}</div>
      </div>
    )
  }, [showPageTitle])

  return (
    <div id={styles.site_logo}>
      <div id={styles.trpfrog_icon}/>
      <div id={styles.site_name_wrapper}>
        <h1 id={styles.site_name}>
          {showPageTitle ? (
            <a onClick={backToTop} style={{cursor: 'pointer'}}>
              {pageTitleElement}
            </a>
          ) : (
            <Link href="/">
              {process.env.title}
            </Link>
          )}
        </h1>
      </div>
    </div>
  );
};
