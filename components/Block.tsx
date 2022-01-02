import React from "react";

type Props = {
    title?: string
    h2icon?: string
    id?: string
    newRibbon?: boolean
}

const Block: React.FunctionComponent<Props> = ({children, title, h2icon='trpfrog', id='', newRibbon=false}) => {
    let h2: JSX.Element = <></>;
    if (title !== undefined) {
        h2 = (
            <h2 className={h2icon}>{title}</h2>
        );
    }
    return (
        <div className={"main-window"} id={id}>
            {newRibbon ? <span className="new-ribbon">NEW!</span> : <></>}
            {h2}
            {children}
        </div>
    )
}

export default Block;