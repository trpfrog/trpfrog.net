import {NextPage} from "next";
import Layout from "../components/Layout";
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/404.module.css';

const TrpFrog404: NextPage = () => {
    return (
        <>
            <Layout>
                <div id={styles.title}>
                    <h1>404 Not Found</h1>
                    <p>
                        <Image
                            src="404"
                            width="332"
                            height="332"
                            alt="404の画像"
                        />
                    </p>
                    <p>このページは存在しません。</p>
                    <p>サイトの工事中、またはリンクの誤りの可能性があります。</p>
                    <p>
                        トップページに戻る場合は<Link href="/"><a>ここ</a></Link>
                        をクリックしてください。
                    </p>
                </div>
            </Layout>
        </>
    )
}

export default TrpFrog404;