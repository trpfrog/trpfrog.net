import type {NextPage} from 'next'
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";
import styles from "../styles/uec-review.module.scss"
import client from "../lib/microCMS";
import Timetable from "../components/uec-review/Timetable";
import {NextSeo} from "next-seo";
import {NextRouter, useRouter} from "next/router";
import Link from "next/link";

export type LectureData = {
    semester: number
    lectureName: string
    teacher: string
    type: string
    dow: string
    period: number
    length?: number
    review?: string
}

export const getServerSideProps = async () => {
    const data = await client.get({ endpoint: "uec-review" });

    const tables: LectureData[][] = Array(6)
    for (let i = 0; i < tables.length; i++) {
        tables[i] = []
    }
    for await (const x of data.contents) {
        tables[x.semester - 1].push(x)
    }

    return {
        props: {
            tables
        },
    };
};

type PageProps = {
    tables: LectureData[][]
}

const getSemester = (router: NextRouter, nPages: number) => {
    const semesterStr = router.query.semester as string
    let semester = parseInt(semesterStr, 10) || 1

    semester = Math.floor(semester)
    if (semester < 1) semester = 1
    if (semester > nPages) semester = Math.floor(nPages)

    return semester - 1
}

const Review: NextPage<PageProps> = ({tables}) => {

    const timetableTitle = [
        '1学期 (8クラス)',
        '2学期 (8クラス, I類3クラス)',
        '3学期 (I類3クラス)',
        '4学期 (I類3クラス, メディア)',
        '5学期 (I類メディア)',
        '6学期 (I類メディア)',
    ]

    const router = useRouter()
    const semester = getSemester(router, timetableTitle.length)

    return (
        <>
            <Layout>
                <Title
                    title={'#uec_review'}
                    description={'授業の感想とか (ツイッタに貼るのは若干恥ずかしいのでやめた)'}
                >
                    <p>
                        <b>注意！</b><br/>
                        このページで紹介している内容は全て私の主観です。
                        私が「面白くなすぎ！」と言っていてもあなたにとっては面白いかもしれませんし、
                        私が「面白すぎ！」と言っていてもあなたにとっては苦行かもしれません。
                        あくまで参考程度に読んでください。
                    </p>
                    <p>
                        また、(怒られが発生したなどで)予告なく内容の変更・削除をする場合があります。ご了承ください。
                    </p>
                </Title>
                <NextSeo
                    noindex={true}
                />
                <div id={styles.buttons} style={{gridTemplateColumns: `repeat(${timetableTitle.length}, 1fr)`}}>
                    {timetableTitle.map((e, i) => (
                        <Link href={'/uec-review?semester=' + (i + 1)} key={'button-' + i} shallow={true}>
                            <a className={'linkButton'}>
                                {e[0]}<span className={styles.pc_only}>{e.split(' ')[0].slice(1)}</span>
                            </a>
                        </Link>
                    ))}
                </div>

                <Block title={timetableTitle[semester]} h2icon={'none'}>
                    <div>
                        <Timetable table={tables[semester]}/>
                    </div>
                </Block>
            </Layout>
        </>
    )
}

export default Review
