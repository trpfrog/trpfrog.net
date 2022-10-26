import type {NextPage} from 'next'
import Image from "next/legacy/image";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";

const About: NextPage = () => {
    return (
        <Layout>
            <Title
                title={'DLコンテンツ'}
                description={'壁紙などダウンロードできるコンテンツの提供ページです。'}
            />
            <Block title={'鬼のウォッチフェイス'} newRibbon={true}>
                <p>
                    Apple Watch の文字盤です。誰得？
                </p>
                <Image
                    src={'/download/watchfaces/oni/thumbnail'}
                    width={512}
                    height={384}
                    className={'rich_image'}
                    layout={'intrinsic'}
                    alt={'鬼のウォッチフェイスの画像'}
                />
                <p>
                    iPhoneからDLしてください
                </p>
                <p className={'link-area'}>
                    <a href="https://res.cloudinary.com/trpfrog/raw/upload/v1641138633/download/watchfaces/oni/oni.watchface">
                        ダウンロード
                    </a>
                </p>
            </Block>

            <Block title={'壁紙: アイコン集合'}>
                <p>
                    Twitterのヘッダー用に作ったものを壁紙に作り直しました。
                </p>
                <Image
                    src={'/download/wallpapers/icons/thumbnail'}
                    width={1000}
                    height={625}
                    className={'rich_image'}
                    layout={'intrinsic'}
                    alt={'アイコン集合の壁紙'}
                />
                <p>
                    PC用は2560×1600pxです。
                </p>
                <p className={'link-area'}>
                    <a href="https://res.cloudinary.com/trpfrog/download/wallpapers/icons/desktop.png">PC</a>
                    <a href="https://res.cloudinary.com/trpfrog/download/wallpapers/icons/background.png">PC (背景)</a>
                    <a href="https://res.cloudinary.com/trpfrog/download/wallpapers/icons/smartphone.png">スマートフォン</a>
                    <a href="https://res.cloudinary.com/trpfrog/download/wallpapers/icons/iphonex.png">縦長 (1:2)</a>
                </p>
            </Block>

            <Block title={'壁紙: 雨'}>
                <p>
                    天気の子の陽菜ちゃんになりたくて作りました。天気の子は観た方が良いです。
                </p>
                <Image
                    src={'/download/wallpapers/rainy/thumbnail'}
                    width={1000}
                    height={625}
                    className={'rich_image'}
                    layout={'intrinsic'}
                    alt={'雨の壁紙'}
                />
                <p>
                    PC用は右にかけて暗くなっていくグラデーションあり版があります。<br/>
                    右側にアイコン並べるようなMacユーザーの方におすすめです。
                </p>
                <p className={'link-area'}>
                    <a href="https://res.cloudinary.com/trpfrog/download/wallpapers/rainy/no_grad.png">PC</a>
                    <a href="https://res.cloudinary.com/trpfrog/download/wallpapers/rainy/desktop.png">PC(グラデあり)</a>
                    <a href="https://res.cloudinary.com/trpfrog/download/wallpapers/rainy/bkg_no_grad.png">PC (背景のみ)</a>
                    <a href="https://res.cloudinary.com/trpfrog/download/wallpapers/rainy/background.png">PC (背景,グラデあり)</a>
                    <a href="https://res.cloudinary.com/trpfrog/download/wallpapers/rainy/smartphone.png">スマートフォン</a>
                    <a href="https://res.cloudinary.com/trpfrog/download/wallpapers/rainy/smartphone_bkg.png">スマホ (背景のみ)</a>
                    <a href="https://res.cloudinary.com/trpfrog/download/wallpapers/rainy/iphonex.png">縦長 (1:2)</a>
                    <a href="https://res.cloudinary.com/trpfrog/download/wallpapers/rainy/iphonex_bkg.png">縦長 (1:2, 背景のみ)</a>
                </p>
            </Block>
        </Layout>
    )
}

export default About

