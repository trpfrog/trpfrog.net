import React from "react";
import Block from "./Block";
import {NextSeo} from "next-seo";

type Props = {
    title?: string
    newRibbon?: boolean
    description?: string
    ribbonText?: string
    cardImageUrl?: string
}

const Title: React.FunctionComponent<Props> = ({
    children, title, description, cardImageUrl, newRibbon=false, ribbonText=''
}) => {
    let titleHtml: JSX.Element = <></>;
    if (title !== undefined) {
        titleHtml = (
            <h1>{title}</h1>
        );
    }
    let descriptionHtml = <></>;
    if (description != undefined) {
        descriptionHtml = <p>{description}</p>;
    }

    return (
        <>
            <NextSeo
                title={title + ' - ' + process.env.title}
                description={description}
                openGraph={cardImageUrl ? {
                    images: [
                        {
                            url: cardImageUrl,
                        }
                    ]
                } : {}}
            />
            <Block id={"title"} newRibbon={newRibbon} ribbonText={ribbonText}>
                <div>
                    {titleHtml}
                    {descriptionHtml}
                    {children}
                </div>
            </Block>
        </>
    );
}

export default Title;