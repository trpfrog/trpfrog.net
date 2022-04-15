import React, {CSSProperties} from "react";
import Block from "./Block";
import {NextSeo} from "next-seo";

type Props = {
    title?: string
    description?: string
    ribbonText?: string
    cardImageUrl?: string
    showDefaultText?: boolean
    style?: CSSProperties
}

const Title: React.FC<React.PropsWithChildren<Props>> = ({
    children, title, description, cardImageUrl, ribbonText='', showDefaultText=true, style
}) => {
    return (
        <>
            <NextSeo
                title={title + ' - ' + process.env.title}
                description={description}
                openGraph={cardImageUrl ? {
                    images: [{ url: cardImageUrl }]
                } : {}}
            />
            <Block id={"title"} ribbonText={ribbonText} style={style}>
                <div>
                    {showDefaultText && title && <h1>{title}</h1>}
                    {showDefaultText && description && <p>{description}</p>}
                    {children}
                </div>
            </Block>
        </>
    );
}

export default Title;