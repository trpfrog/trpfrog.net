import type {NextPage} from 'next'
import {GetStaticProps} from "next";

import styles from "../styles/certification.module.scss";

import Layout from "../components/Layout";
import Title from "../components/Title";
import Block from "../components/Block";
import path from "path";
import fs from "fs";

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


  return (
    <Layout>
      <Title
        title={'免許・資格'}
        description={'つまみさんの解除した実績を自慢するところです。'}
      />
      <Block>
        <div id={styles.cert_grid}>
          {certs.map(({ name, year, month }, index) => (
            <div className={styles.cert} key={'cert-' + index}>
              <div className={styles.date_wrapper}>
                <time className={styles.date}>
                  <div className={styles.year_val}>{year}</div>
                  <div className={styles.year}>年</div>
                  <div className={styles.month_val}>{month}</div>
                  <div className={styles.month}>月</div>
                </time>
              </div>
              <div
                className={styles.value}
                style={name === '東京タワー昇り階段認定証'
                  ? {color: 'gray'}
                  : {}
                }
              >
                {name}
              </div>
            </div>
          ))}
        </div>
      </Block>
    </Layout>
  )
}

export default Certification
