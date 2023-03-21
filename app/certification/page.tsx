import styles from "../../styles/certification.module.scss";

import Title from "../../components/Title";
import Block from "../../components/Block";
import path from "path";
import fs from "fs/promises";

type Cert = {
  name: string,
  year: number,
  month: number
}

export default async function Index() {
  const jsonPath = path.join(process.cwd(), 'data', 'certification.json');
  const jsonText = await fs.readFile(jsonPath, 'utf-8');

  const f = (x: Cert) => x.year * 100 + x.month
  const certs: Cert[] = JSON
    .parse(jsonText)
    .sort((a: Cert, b: Cert) => f(b) - f(a))

  return (
    <div id="main_wrapper">
      <Title
        title={'免許・資格'}
        description={'つまみさんの解除した実績を自慢するところです。'}
      />
      <Block>
        <div id={styles.cert_grid}>
          {certs.map(({name, year, month}, index) => (
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
    </div>
  )
}
