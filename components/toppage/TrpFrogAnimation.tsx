import {motion} from "framer-motion";
import styles from "../../styles/top-page/TrpFrogAnimation.module.scss"

const TrpFrogAnimation = () => {
    return (
        <>
            <div id={styles.animation}>
                <motion.div
                    id={styles.trpfrog_name}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.7 }}
                    transition={{ delay: 1.2, duration: 1 }}
                >Welcome!</motion.div>
                <motion.div
                    id={styles.lines}
                    initial={{ '--trpfrog-animation-start-degree': '0deg' } as any}
                    animate={{ '--trpfrog-animation-start-degree': '360deg' } as any}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />
                <div id={styles.trpfrog_image}/>
            </div>
        </>
    );
}

export default TrpFrogAnimation;
