import Link from 'next/link'
import styles from '../styles/common/Footer.module.scss'

const Footer = () => {
  return (
    <footer id={styles.footer}>
      <div id={styles.footer_wrapper}>
        <p id={styles.copyright}>
          &copy; 2019-2022 つまみ
        </p>
        <p>
          <Link href={'/legal'}>
            <a className={styles.footer_button}>Legal</a>
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
