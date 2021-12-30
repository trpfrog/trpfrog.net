import React from "react"
import styles from "../styles/environment.module.css";
import Image from 'next/image';
import path from 'path'

type Props = {
    name: string
    imagePath?: string
}

const GadgetIntro: React.FunctionComponent<Props> = ({children, name, imagePath}) => {
    let imageHtml: JSX.Element = <></>;
    if (imagePath !== undefined) {
        imageHtml = (
            <div className={styles.gadget_image_wrapper}>
                <Image
                    src={'environment/' + imagePath}
                    alt={name + 'の画像'}
                    width={400}
                    height={300}
                    layout={'responsive'}
                    objectFit={'cover'}
                />
            </div>
        );
    }
    return (
        <>
            <h4 className={styles.name}>{name}</h4>
            {imageHtml}
            {children}
        </>
    );
}

export default GadgetIntro;