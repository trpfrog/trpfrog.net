import Link from 'next/link'

const Navigation = () => {
    return (
        <nav id="wide-nav">
            <div id="wide-nav-wrapper">
                <Link href="/">
                    <a className="sidemenu_link">Home</a>
                </Link>
                {/*<Link href="/notes">*/}
                {/*    <a className="sidemenu_link">Notes</a>*/}
                {/*</Link>*/}
                {/*<Link href="/icon_gallery">*/}
                {/*    <a className="sidemenu_link">Icon</a>*/}
                {/*</Link>*/}
                <Link href="/stickers">
                    <a className="sidemenu_link">Stickers</a>
                </Link>
                {/*<Link href="/balloon">*/}
                {/*    <a className="sidemenu_link">Balloon</a>*/}
                {/*</Link>*/}
                {/*<Link href="/download">*/}
                {/*    <a className="sidemenu_link">Download</a>*/}
                {/*</Link>*/}
                {/*<Link href="/iconmaker">*/}
                {/*    <a className="sidemenu_link">Icon Maker</a>*/}
                {/*</Link>*/}
                <Link href="/environment">
                    <a className="sidemenu_link">Environment</a>
                </Link>
                {/*<Link href="/walking">*/}
                {/*    <a className="sidemenu_link">Walking</a>*/}
                {/*</Link>*/}
            </div>
        </nav>
    );
}

export default Navigation;

