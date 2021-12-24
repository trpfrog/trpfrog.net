import Link from 'next/link'

const Navigation = () => {
    return (
        <nav id="wide-nav">
            <div id="wide-nav-wrapper">
                <Link href="/index.html">
                    <a className="sidemenu_link">Home</a>
                </Link>
                <Link href="/notes/index.html">
                    <a className="sidemenu_link">Notes</a>
                </Link>
                <Link href="/icon_gallery/index.html">
                    <a className="sidemenu_link">Icon</a>
                </Link>
                <Link href="/sticker_gallery/index.html">
                    <a className="sidemenu_link">Sticker</a>
                </Link>
                <Link href="/balloon/index.html">
                    <a className="sidemenu_link">Balloon</a>
                </Link>
                <Link href="/download/index.html">
                    <a className="sidemenu_link">Download</a>
                </Link>
                <Link href="/iconmaker/index.html">
                    <a className="sidemenu_link">Icon Maker</a>
                </Link>
                <Link href="/environment/index.html">
                    <a className="sidemenu_link">Environment</a>
                </Link>
                <Link href="/walking/index.html">
                    <a className="sidemenu_link">Walking</a>
                </Link>
            </div>
        </nav>
    );
}

export default Navigation;

