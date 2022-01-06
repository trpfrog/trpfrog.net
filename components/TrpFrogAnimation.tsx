import {motion} from "framer-motion";

const TrpFrogAnimation = () => {
    return (
        <>
            <div id={'top-page-animation'}>
                <div id={'top-page-animation-mask'}/>
                <motion.div
                    id={'top-page-animation-name'}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.7 }}
                    transition={{ delay: 1.2, duration: 1 }}
                >Welcome!</motion.div>
                <motion.div
                    id={'top-page-animation-lines'}
                    initial={{ '--trpfrog-animation-start-degree': '0deg' } as any}
                    animate={{ '--trpfrog-animation-start-degree': '360deg' } as any}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />
                <div id={'top-page-trpfrog'}/>
            </div>
        </>
    );
}

export default TrpFrogAnimation;
