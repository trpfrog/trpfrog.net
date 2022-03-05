import React, {CSSProperties, FunctionComponent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faClock, faSyncAlt} from "@fortawesome/free-solid-svg-icons";
import {BlogPost} from "../../lib/blog/load";
import {formatReadTime} from "../../lib/blog/readTime";
import Tag from "./Tag";
import dayjs from "dayjs";

type Props = {
    entry: BlogPost
}

const ArticleBlock: FunctionComponent<Props> = ({
    children, entry,
}) => {
    const {
        minutes: readMin,
        seconds: readSec
    } = formatReadTime(entry.readTime)

    return (
        <div>

        </div>
    )
}

export default ArticleBlock
