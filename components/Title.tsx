import React from "react";
import Block from "./Block";

type Props = {
    title?: string
    newRibbon?: boolean
}

const Title: React.FunctionComponent<Props> = ({children, title, newRibbon=false}) => {
    let titleHtml: JSX.Element = <></>;
    if (title !== undefined) {
        titleHtml = (
            <h1>{title}</h1>
        );
    }
    return (
        <Block id={"title"} newRibbon={newRibbon}>
            <div>
                {titleHtml}
                {children}
            </div>
        </Block>
    );
}

export default Title;