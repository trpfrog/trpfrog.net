import Block from "../Block";
import styles from "../../styles/top-page/main.module.scss";

type Props = {
    id?: string
}

const Bird = ({id}: Props) => {
  return (
    <Block title={'特に意味のない鳥'} h2icon={'think'} id={id}>
      <div style={{textAlign: 'center'}}>
        <pre className={styles.aa}>
          {"\n　　 ／￣￣＼　ﾑｼｬﾑｼｬ\n"}
          {"  /　 (●)/￣￣＼\n"}
          {".　 / 　 　ト、 　 ＼\n"}
          {"　彳 　 　 ＼＼　　|\n"}
          {".／　　　/⌒ヽヽ　 |\n"}
          {"/　 　 　 |　　| .|　 /。\n"}
          {"　　　　|　　ヽ|／∴\n"}
          {"　　　　　　　。゜\n"}
        </pre>
        <pre className={styles.aa} style={{marginLeft: "20px"}}>
          {"オエーー !!!　＿＿_\n"}
          {"　　　 ＿＿_／　　 ヽ\n"}
          {"　　 ／ 　 ／　／⌒ヽ|\n"}
          {"/　(ﾟ)/　 ／ /\n"}
          {".　 /　 　 ﾄ､ /｡⌒ヽ。\n"}
          {"　彳　 　 ＼＼ﾟ｡∴｡ｏ\n"}
          {".／　　　　 ＼＼｡ﾟ｡ｏ\n"}
          {"/　　　　 ／⌒＼Ｕ∴)\n"}
          {"　　　 　 | 　　ﾞＵ |\n"}
          {"　　　 　 | 　　　| |\n"}
          {"　　　　　　　　Ｕ"}
        </pre>
      </div>
    </Block>
  )
}

export default Bird
