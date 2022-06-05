import React, {CSSProperties} from "react";
import Block from "./Block";
import {NextSeo} from "next-seo";

type Props = {
    title?: string
    description?: string
    ribbonText?: string
    cardImageUrl?: string
    showDefaultText?: boolean
    children?: React.ReactNode
    style?: CSSProperties
}

const Title: React.FunctionComponent<Props> = (props) => {
    const {
        children,
        title,
        description,
        showDefaultText=true
    } = props

    return (
        <>
            <NextSeo
                title={title + ' - ' + process.env.title}
                description={props.description}
                openGraph={props.cardImageUrl ? {
                    images: [{ url: props.cardImageUrl }]
                } : {}}
            />
            <Block
                id={"title"}
                ribbonText={props.ribbonText ?? ''}
                style={props.style}
            >
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