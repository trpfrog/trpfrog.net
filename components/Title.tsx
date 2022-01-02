import React from "react";
import Block from "./Block";

type Props = {
    title?: string
    newRibbon?: boolean
    ribbonText?: string
}

const Title: React.FunctionComponent<Props> = ({children, title, newRibbon=false, ribbonText=''}) => {
    let titleHtml: JSX.Element = <></>;
    if (title !== undefined) {
        titleHtml = (
            <h1>{title}</h1>
        );
    }
    return (
        <Block id={"title"} newRibbon={newRibbon} ribbonText={ribbonText}>
            <div>
                {titleHtml}
                {children}
            </div>
        </Block>
    );
}

export default Title;