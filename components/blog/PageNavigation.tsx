import React, {CSSProperties} from "react";
import {BlogPost} from "../../lib/blog/load";
import Link from "next/link";
import {useRouter} from "next/router";

type Props = {
    entry: BlogPost,
    doNotShowOnFirst?: boolean
}

type PageTransferProps = {
    slug: string
    nextPage: number
    buttonText: string
}

export const PageTransferButton = (props: PageTransferProps) => {
    const {slug, nextPage, buttonText} = props
    return (
        <a href={`/blog/${slug}/${nextPage}`} className={'linkButton'}>{buttonText}</a>
    )
}

const PageNavigation = ({entry, doNotShowOnFirst = false}: Props) => {
    const pagePosition1Indexed = entry.currentPage

    const disabledButtonStyle: CSSProperties = {
        background: 'darkgray',
        transform: 'translateY(2px)',
        boxShadow: 'none',
        cursor: 'default'
    }

    return entry.numberOfPages === 1 || (doNotShowOnFirst && entry.currentPage <= 1) ? (
        <></>
    ) : (
        <div style={{textAlign: 'center'}} className={'link-area'}>
            {entry.currentPage > 1 &&
                <PageTransferButton
                    slug={entry.slug}
                    nextPage={pagePosition1Indexed - 1}
                    buttonText={'← Prev'}
                />
            }
            {Array.from(Array(entry.numberOfPages), (v, k) => (
                entry.currentPage !== k + 1
                    ? <PageTransferButton
                        slug={entry.slug}
                        nextPage={k + 1}
                        buttonText={k + 1 + ''}
                        key={k}
                    />
                    : <a style={disabledButtonStyle} className={'linkButton'} key={k}>{k + 1}</a>
            ))}
            {entry.currentPage < entry.numberOfPages &&
                <PageTransferButton
                    slug={entry.slug}
                    nextPage={pagePosition1Indexed + 1}
                    buttonText={'Next →'}
                />
            }
        </div>
    )
}

export default PageNavigation
