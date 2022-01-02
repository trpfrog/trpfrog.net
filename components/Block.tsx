import React from "react";

type Props = {
    title?: string
    h2icon?: string
    id?: string
    newRibbon?: boolean
    ribbonText?: string
}

const Block: React.FunctionComponent<Props> = ({
    children, title, h2icon='trpfrog', id='', newRibbon=false, ribbonText=''
}) => {
    let h2 = <></>;
    if (title !== undefined) {
        h2 = (
            <h2 className={h2icon}>{title}</h2>
        );
    }
    let ribbon = <></>;
    if (newRibbon) ribbonText = 'NEW!';
    if (ribbonText != '') {
        ribbon = <span className="new-ribbon">{ribbonText}</span>
    }

    return (
        <div className={"main-window"} id={id}>
            {ribbon}
            {h2}
            {children}
        </div>
    )
}

export default Block;