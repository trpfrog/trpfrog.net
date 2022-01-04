import {motion} from "framer-motion";

const TrpFrogAnimation = () => {
    return (
        <div id={'top-page-animation'}>
            <motion.div
                id={'top-page-animation-lines'}
                initial={{ '--trpfrog-animation-start-degree': '0deg' } as any}
                animate={{ '--trpfrog-animation-start-degree': '360deg' } as any}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <div id={'top-page-trpfrog'}/>
        </div>
    );
}

export default TrpFrogAnimation;
