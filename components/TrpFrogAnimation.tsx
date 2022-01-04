import {motion} from "framer-motion";

const TrpFrogAnimation = () => {
    return (
        <div id={'top-page-animation'}>
            <motion.div id={'top-page-animation-lines'}
                // animate={{ rotate: 360 }}
                // transition={{ ease: "linear", duration: 2, repeat: Infinity }}
            />
            <div id={'top-page-trpfrog'}/>
        </div>
    );
}

export default TrpFrogAnimation;
