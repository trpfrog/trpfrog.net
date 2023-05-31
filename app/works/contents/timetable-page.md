    <Block title={'Timetable Page'}>
  <div className={styles.hero_image}>
    <Image
      src={'works/timetable-page'}
      width={1396}
      height={1094}
      objectFit={'cover'}
      alt={'Timetable Page の画像'}
    />
  </div>
  <Keywords keywords={[
    'HTML', 'CSS', 'JavaScript', 'Docker'
  ]}/>
  <p>
    <b>Released:</b> 2021/10/5
  </p>
  <p>
    大学の時間割を模したホームページが作れるソフトウェア。付属の timetable.js に
    「授業名」「時限」「担当者名」「授業ホームページ」「遠隔授業参加URL」などを書くと、
    それに合わせてサイトが生成される。
  </p>
  <p>
    timetable.js は授業の構造体のみが書かれた JavaScript ファイルであり、
    JSONファイルを扱うように書くことができ、特別なプログラミングの技術を必要としない。
  </p>
  <p>
    index.html にデータは反映されるが、配布しているDockerコンテナを使ってWebサーバを立てることも可能。
  </p>
  <p className={'link-area'}>
    <a
      href="https://github.com/TrpFrog/timetable-page"
      target="_blank"
      rel="noopener noreferrer">
      GitHub
    </a>
    <a
      href="https://github.com/TrpFrog/timetable-page/pkgs/container/timetable"
      target="_blank"
      rel="noopener noreferrer">
      GitHub Packages
    </a>
  </p>
</Block>
