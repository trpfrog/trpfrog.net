import React from "react"
import styles from "../styles/environment.module.css";
import Image from 'next/image';
import path from 'path'

const imageDirectory = path.join(process.cwd(), 'images', 'environment');

type Props = {
    name: string
    imagePath?: string
}

const GadgetIntro: React.FunctionComponent<Props> = ({children, name, imagePath}) => {
    let imageHtml: JSX.Element = <></>;
    if (imagePath !== undefined) {
        const imageFullPath = path.join(imageDirectory, imagePath)
        imageHtml = (
            <div className={styles.gadget_image_wrapper}>
                <Image
                    src={imageFullPath}
                    alt={name}
                    // className={styles.image}
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
            <h3 className={styles.name}>{name}</h3>
            {imageHtml}
            {children}
        </>
    );
}

export default GadgetIntro;