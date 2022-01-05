import Link from 'next/link'

const Header = () => {
    return (
        <header>
            <div id="header-wrapper">
                <h1>
                    <Link href="/">
                        <a>{process.env.title}</a>
                    </Link>
                </h1>
                <nav>
                    <ul>
                        <li>
                            <Link href="/">
                                <a className="headerButton">home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/notes">
                                <a className="headerButton">notes</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://trpfrog.hateblo.jp">
                                <a className="headerButton">blog</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;