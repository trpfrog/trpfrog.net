import {BlogImageData} from "../../lib/blog";
import React, {CSSProperties, useState} from "react";
import styles from "../../styles/blog/blog.module.scss";
import Image from "next/image";
import Modal from "react-modal";
import {getPureCloudinaryPath, parseInlineMarkdown} from "./BlogMarkdown";

type BlogImageProps = {
    src: string,
    alt: string,
    imageData?: BlogImageData
    style?: CSSProperties
}

const BlogImage = ({src, alt, imageData, style}: BlogImageProps) => {

    if (!imageData) {
        imageData = {
            caption: '',
            size: {
                width: 800,
                height: 600
            }
        }
    }

    const srcPath = getPureCloudinaryPath(src)
    const blurPath = `https://res.cloudinary.com/trpfrog/image/upload/w_10${srcPath}`
    const caption = imageData.caption ?? ''

    let width = imageData.size?.width ?? 400
    let height = imageData.size?.height ?? 300

    const maxHeight = 600;
    if (height > maxHeight) {
        width = width / height * maxHeight
        height = maxHeight
    }

    const modalStyle = {
        overlay: {
            position: 'fixed',
            background: 'rgba(0,0,0,.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        } as CSSProperties,
        content: {
            position: 'static',
            width: `min(calc(80vh * ${width / height}), 95vw)`,
            height: `min(calc(95vw * ${height / width}), 80vh)`,
            padding: 0,
            background: 'transparent',
            border: 'none',
        } as CSSProperties
    }

    const [modalState, setModalState] = useState(false)
    return (
        <>
            <div className={styles.blog_img_wrapper} style={style}>
                <Image
                    src={srcPath}
                    alt={alt || src}
                    className={`rich_image ${styles.blog_img}`}
                    width={width}
                    height={height}
                    quality={50}
                    placeholder="blur"
                    blurDataURL={blurPath}
                    objectFit="contain"
                    onClick={() => setModalState(true)}
                />
                {caption != '' &&
                    <p className={styles.blog_img_caption}>
                        {parseInlineMarkdown(caption)}
                    </p>
                }
            </div>
            <Modal
                isOpen={modalState}
                style={modalStyle}
                onRequestClose={() => setModalState(false)}
            >
                <Image
                    src={srcPath}
                    alt={alt || src}
                    className={`rich_image`}
                    width={width}
                    height={height}
                    placeholder="blur"
                    blurDataURL={blurPath}
                    layout='responsive'
                />
            </Modal>
        </>
    )
}

export default BlogImage
