import React from "react";

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
        <div id={"title"}>
            {titleHtml}
            {children}
        </div>
    );
}

export default Title;