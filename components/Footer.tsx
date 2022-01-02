import Link from 'next/link'

const Footer = () => {
    return (
        <footer>
            <div id="footer-wrapper">
                <p id="copyright">
                    &copy; 2019-2022 つまみ
                </p>
                <p>
                    <Link href={'/legal'}>
                        <a className={'footer-button'}>Legal</a>
                    </Link>
                </p>
            </div>
        </footer>
    );
}

export default Footer;