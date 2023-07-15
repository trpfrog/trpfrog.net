import React from "react";
import styles from './index.module.scss';

export default function MainWrapper(props: React.ComponentProps<'div'>) {
  const {className, children, ...otherProps} = props
  return (
    <div className={`${styles.main_wrapper} ${className}`} {...otherProps}>
      {children}
    </div>
  )
}
