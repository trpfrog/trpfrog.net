import type {NextPage} from 'next'
import {getMutualLinkRecords, MutualLinkRecord} from "../lib/MutualLinks";
import {GetStaticProps} from "next";

import styles from "../styles/top-page/main.module.scss";

import Link from "next/link";
import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";
import path from "path";
import fs from "fs";
import {CSSProperties} from "react";

type Cert = {
    name: string,
    year: number,
    month: number
}

type PageProps = {
    certs: Cert[]
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const jsonPath = path.join(process.cwd(), 'data', 'certification.json');
    const jsonText = fs.readFileSync(jsonPath, 'utf-8');

    const f = (x: Cert) => x.year * 100 + x.month
    const certs = JSON
        .parse(jsonText)
        .sort((a: Cert, b: Cert) => f(b) - f(a))

    return {
        props: {
            certs
        }
    }
}

const Certification: NextPage<PageProps> = ({certs}: PageProps) => {

    const style: CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '2.5em repeat(3, .8em) auto',
        textAlign: 'center',
        gap: 5,
        padding: '10px',
        margin: '0 auto',
        fontWeight: 'bold',
    }

    return (
        <Layout>
            <Title
                title={'免許・資格'}
                description={'つまみさんの解除した実績を自慢するところです。'}
            />
            <Block>
                <div style={style}>
                    {certs.map(({ name, year, month }, index) => (
                        <>
                            <div key={'cert1-' + index}>{year}</div>
                            <div key={'cert2-' + index}>年</div>
                            <div key={'cert3-' + index}>{month}</div>
                            <div key={'cert4-' + index}>月</div>
                            <div key={'cert5-' + index}>

                                <div style={{
                                    textAlign: 'left',
                                    marginLeft: 5,
                                    fontWeight: 'normal'
                                }}>
                                    {name}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </Block>
        </Layout>
    )
}

export default Certification
