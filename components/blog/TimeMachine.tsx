import React, {useEffect, useState} from "react";
import {BlogPost, TimeMachineSHA} from "../../lib/blog/load";
import {BlogImageData} from "../../lib/blog/imagePropsFetcher";
import styles from "../../styles/blog/blog.module.scss";
import dayjs from "dayjs";

type Props = {
    setPost:  React.Dispatch<React.SetStateAction<any>>
    originalEntry: BlogPost
    imageSize: { [path: string]: BlogImageData }
    pastArticleSHA: TimeMachineSHA[]
}

const TimeMachine = ({setPost, originalEntry, imageSize, pastArticleSHA}: Props) => {
  const CURRENT_POST_SHA = 'current'
  const [articleSourceSHA, setArticleSourceSHA] = useState(CURRENT_POST_SHA)
  useEffect(() => {
    if (originalEntry.slug.startsWith('_') || articleSourceSHA === CURRENT_POST_SHA) {
      setPost({...originalEntry, imageSize})
      return
    }

    const endpoint = `/api/posts/history/${originalEntry.slug}/${articleSourceSHA}/${
      originalEntry.isAll ? 'all' : originalEntry.currentPage
    }`

    let pastArticle = sessionStorage?.getItem(endpoint);
    if (pastArticle && pastArticle.trim() === '') {
      // Use cache
      setPost({...JSON.parse(pastArticle), imageSize})
    } else {
      // If there is no cache, fetch the past article
      fetch(endpoint).then(res => {
        res.json().then(json => {
          sessionStorage.setItem(endpoint, JSON.stringify(json))
          setPost({...json, imageSize})
        })
      })
    }
  }, [articleSourceSHA, CURRENT_POST_SHA, originalEntry, imageSize, setPost])

  if (originalEntry.slug.startsWith('_')) return <></>
  return (
    <details className={styles.pretty_details}>
      <summary>Time Machine (beta)</summary>
      <p>
                過去の版の記事を読むことができます。
      </p>
      <div style={{display: 'flex', flexFlow: 'column', gap: 10, margin: 10}}>
        {pastArticleSHA.map(({sha, date}, idx) => (
          <div key={sha}>
            <a
              key={sha}
              className={'linkButton'}
              onClick={() => {
                setArticleSourceSHA(idx ? sha : CURRENT_POST_SHA)
              }}
              style={{padding: '0.5em 1em'}}
            >
              {dayjs(date).format('YYYY年MM月DD日hh時mm分')}
            </a>
          </div>
        ))}
        <div style={{margin: '0 !important'}}>
                    現在表示している記事:{' '}
          <b>
            {articleSourceSHA === CURRENT_POST_SHA
              ? dayjs(pastArticleSHA[0].date)
                .format('YYYY年MM月DD日hh時mm分') + ' (最新版)'
              : dayjs(pastArticleSHA.filter(e => e.sha === articleSourceSHA)[0].date)
                .format('YYYY年MM月DD日hh時mm分')
            }
          </b>
        </div>
      </div>
      <div>
        <a
          className={'linkButton'}
          style={{padding: '0.5em 1em'}}
          href={`https://github.com/TrpFrog/trpfrog.net/blame/HEAD/posts/${originalEntry.slug}.md`}
          target={'_blank'} rel="noreferrer"
        >
                    GitHub で最新版との差分を確認
        </a>
        <br/><br/>
      </div>
    </details>
  )
}

export default TimeMachine
