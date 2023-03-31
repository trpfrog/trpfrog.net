import Link from 'next/link'
import styles from '../styles/common/Footer.module.scss'

const Footer = () => {
  return (
    <footer id={styles.footer}>
      <div id={styles.inner_footer}>
        <p id={styles.copyright}>
          &copy; 2019-2022 つまみ
        </p>
        <p>
          <Link href={'/legal'} className={styles.footer_button}>
            Legal
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
