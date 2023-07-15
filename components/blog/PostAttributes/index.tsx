import styles from "./index.module.scss";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDay, faClock, faImages, faSyncAlt, faWalking} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import BlogPost from "@/lib/blog/blogPost";

type Props = {
  post: BlogPost
}

const PostAttributes = ({post}: Props) => {

  type ContentProps = {
    icon: IconProp,
    title: string
    children: React.ReactNode
  }

  const Content = ({icon, title, children}: ContentProps) => {
    return (
      <div className={styles.post_attr}>
        <FontAwesomeIcon icon={icon}/> {title}
        <div className={styles.attr_val}>
          <div>
            {children}
          </div>
        </div>
      </div>
    )
  }

  const AttrDay = ({d}: { d: string }) => {
    const Y = dayjs(d).format('YYYY')
    const M = dayjs(d).format('M')
    const D = dayjs(d).format('D')
    return (
      <time dateTime={d}>
        {Y}年<br/>
        <span style={{fontSize: '1.7em', padding: '0 4px', letterSpacing: -1}}>{M}</span>月
        <span style={{fontSize: '1.7em', padding: '0 4px', letterSpacing: -1}}>{D}</span>日
      </time>
    )
  }

  return (
    <div id={styles.post_attributes}>
      <Content icon={faCalendarDay} title={'投稿日'}>
        <AttrDay d={post.date}/>
      </Content>

      {(post.updated && post.date < post.updated) &&
        <Content icon={faSyncAlt} title={'更新日'}>
          <AttrDay d={post.updated}/>
        </Content>
      }

      {post.held &&
        <Content icon={faWalking} title={'実施日'}>
          <AttrDay d={post.held}/>
        </Content>
      }

      <Content icon={faClock} title={'読了予想時間'}>
        <span className={styles.attr_num}>{Math.ceil(post.readTime / 60)}</span> 分
      </Content>

      {(['徒歩', '登山'].some(e => post.tags.includes(e))) &&
        <Content icon={faImages} title={'写真の枚数'}>
          <span className={styles.attr_num}>{post.numberOfPhotos}</span> 枚
        </Content>
      }
    </div>
  )
}

export default PostAttributes
