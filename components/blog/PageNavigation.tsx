import React from "react";
import {BlogPost} from "../../lib/blog/load";
import Link from "next/link";

type Props = {
    entry: BlogPost,
    pagePosition: number,
    doNotShowOnFirst?: boolean
}

const PageNavigation = ({entry, pagePosition, doNotShowOnFirst = false}: Props) => {
    const pagePosition1Indexed = pagePosition + 1;
    return entry.content.length < 2 || (doNotShowOnFirst && pagePosition < 1) ? (
        <></>
    ) : (
        <div style={{textAlign: 'center'}}>
            <div className={'link-area'}>
                {pagePosition > 0 &&
                    <Link href={`/blog/entry/${entry.slug}?page=${pagePosition1Indexed - 1}`}>
                        <a>&larr; Prev</a>
                    </Link>
                }
                {Array.from(Array(entry.content.length), (v, k) => (
                    <span key={k}>
                        {pagePosition == k ? (
                            <a style={{
                                background: 'darkgray',
                                transform: 'translateY(2px)',
                                boxShadow: 'none',
                                cursor: 'default'
                            }}>
                                {k + 1}
                            </a>
                        ) : (
                            <Link href={`/blog/entry/${entry.slug}?page=${k + 1}`}>
                                <a>{k + 1}</a>
                            </Link>
                        )}
                    </span>
                ))}
                {pagePosition < entry.content.length - 1 &&
                    <Link href={`/blog/entry/${entry.slug}?page=${pagePosition1Indexed + 1}`}>
                        <a>Next &rarr;</a>
                    </Link>
                }
            </div>
        </div>
    )
}

export default PageNavigation
