import React from "react";

type Props = {
    title?: string
    h2icon?: string
    id?: string
}

const Block: React.FunctionComponent<Props> = ({children, title, h2icon='trpfrog', id=''}) => {
    let h2: JSX.Element = <></>;
    if (title !== undefined) {
        h2 = (
            <h2 className={h2icon}>{title}</h2>
        );
    }
    return (
        <div className={"main-window"} id={id}>
            {h2}
            {children}
        </div>
    )
}

export default Block;