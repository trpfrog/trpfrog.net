import { tv } from '@/lib/tailwind/variants'

const createStyles = tv({
  slots: {
    wrapper: 'tw-grid tw-grid-cols-subgrid sp:tw-grid-cols-3',
    aboutMe:
      'tw-bg-amber-300 sp:tw-col-span-3 pc:tw-col-span-2 pc:tw-row-span-3',
    social: 'tw-bg-amber-300',
  },
})

type Props = {
  id: string
}

export function AboutMe() {
  const styles = createStyles()
  return (
    <div className={styles.wrapper()}>
      <div className={styles.aboutMe()}>AboutMe</div>
      <div className={styles.social()}>GitHub</div>
      <div className={styles.social()}>Twitter</div>
      <div className={styles.social()}>Mail</div>
    </div>
  )
}
