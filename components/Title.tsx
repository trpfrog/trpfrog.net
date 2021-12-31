import React from "react";
import Block from "./Block";

type Props = {
    title?: string
}

const Title: React.FunctionComponent<Props> = ({children, title}) => {
    let titleHtml: JSX.Element = <></>;
    if (title !== undefined) {
        titleHtml = (
            <h1>{title}</h1>
        );
    }
    return (
        <Block id={"title"}>
            <div>
                {titleHtml}
                {children}
            </div>
        </Block>
    );
}

export default Title;