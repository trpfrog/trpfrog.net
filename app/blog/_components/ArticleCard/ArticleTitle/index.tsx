import React from "react";
import styles from "./index.module.scss";
import {ParseWithBudouX} from "@/lib/wordSplit";
import Balancer from "react-wrap-balancer";

type Props = Omit<React.ComponentProps<'div'>, 'children'> & {
  title: string
  isHero?: boolean
}

export default function ArticleTitle(props: Props) {
  const {title, className, isHero, ...rest} = props
  return (
    <div className={`${styles.wrapper} ${className}`} {...rest} data-hero-article={!!isHero}>
      <h3 data-hero-article={!!isHero} className={styles.title}>
        <Balancer>
          <ParseWithBudouX str={title} slug={`${props.key ?? title}`}/>
        </Balancer>
      </h3>
    </div>
  )
}
