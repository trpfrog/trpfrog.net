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
                <div id="tweet_search">
                    <form>
                        <input type="text" placeholder="過去ツイサーチ" id="tweet_search_box" />
                        <input type="submit" value="検索" className="twibutton" />
                    </form>
                </div>
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