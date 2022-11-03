import React, {CSSProperties} from "react";

type Props = {
  title?: string
  h2icon?: string
  id?: string
  newRibbon?: boolean
  ribbonText?: string
  className?: string
  style?: CSSProperties | undefined
  children?: React.ReactNode
}

const Block: React.FunctionComponent<Props> = ({
  children,
  title,
  h2icon = 'trpfrog',
  id = '',
  newRibbon = false,
  ribbonText = '',
  style,
  className = ''
}) => {

  let ribbon = <></>;
  if (newRibbon) ribbonText = 'NEW!';
  if (ribbonText != '') {
    ribbon = <span className="new-ribbon">{ribbonText}</span>
  }

  return (
    <div className={`main-window ${className}`} id={id} style={style}>
      {ribbon}
      {title && <h2 className={h2icon}>{title}</h2>}
      {children}
    </div>
  )
}

export default Block;
