import Block from '@/components/Block'
import styles from '@/app/(home)/style.module.scss'

type Props = {
  id?: string
}

const Bird = ({ id }: Props) => {
  const birdX = [
    '',
    '　　 ／￣￣＼　ﾑｼｬﾑｼｬ',
    '  /　 (●)/￣￣＼',
    '.　 / 　 　ト、 　 ＼',
    '　彳 　 　 ＼＼　　|',
    '.／　　　/⌒ヽヽ　 |',
    '/　 　 　 |　　| .|　 /。',
    '　　　　|　　ヽ|／∴',
    '　　　　　　　。゜',
    '',
    '',
  ].join('\n')

  const birdY = [
    'オエーー !!!　＿＿_',
    '　　　 ＿＿_／　　 ヽ',
    '　　 ／ 　 ／　／⌒ヽ|',
    '/　(ﾟ)/　 ／ /',
    '.　 /　 　 ﾄ､ /｡⌒ヽ。',
    '　彳　 　 ＼＼ﾟ｡∴｡ｏ',
    '.／　　　　 ＼＼｡ﾟ｡ｏ',
    '/　　　　 ／⌒＼Ｕ∴)',
    '　　　 　 | 　　ﾞＵ |',
    '　　　 　 | 　　　| |',
    '　　　　　　　　Ｕ',
  ].join('\n')

  return (
    <Block title={'特に意味のない鳥'} h2icon={'think'} id={id}>
      <div style={{ textAlign: 'center' }}>
        <pre className={styles.aa}>{birdX}</pre>
        <pre className={styles.aa} style={{ marginLeft: '20px' }}>
          {birdY}
        </pre>
      </div>
    </Block>
  )
}

export default Bird
