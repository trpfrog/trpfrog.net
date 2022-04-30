import React, {CSSProperties} from "react";
import {BlogPost} from "../../lib/blog/load";
import Link from "next/link";
import {useRouter} from "next/router";

type Props = {
    entry: BlogPost,
    doNotShowOnFirst?: boolean
}

const PageNavigation = ({entry, doNotShowOnFirst = false}: Props) => {
    const pagePosition1Indexed = entry.currentPage

    const PageButton = ({nxt, txt}: {nxt: number, txt?: string}) => (
        <Link href={{
            pathname: `/blog/${entry.slug}/${nxt}`
        }}>
            <a>{txt ?? nxt + ""}</a>
        </Link>
    )

    const disabledButtonStyle: CSSProperties = {
        background: 'darkgray',
        transform: 'translateY(2px)',
        boxShadow: 'none',
        cursor: 'default'
    }

    return entry.numberOfPages === 1 || (doNotShowOnFirst && entry.currentPage <= 1) ? (
        <></>
    ) : (
        <div style={{textAlign: 'center'}}>
            <div className={'link-area'}>
                {entry.currentPage > 1 &&
                    <PageButton nxt={pagePosition1Indexed - 1} txt={'← Prev'}/>
                }
                {Array.from(Array(entry.numberOfPages), (v, k) => (
                    entry.currentPage !== k + 1
                       ? <PageButton nxt={k + 1} key={k}/>
                       : <a style={disabledButtonStyle} key={k}>{k + 1}</a>
                ))}
                {entry.currentPage < entry.numberOfPages &&
                    <PageButton nxt={pagePosition1Indexed + 1} txt={'Next →'}/>
                }
            </div>
        </div>
    )
}

export default PageNavigation
