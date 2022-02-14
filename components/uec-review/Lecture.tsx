import styles from "../../styles/uec-review.module.scss";
import {LectureData} from "../../pages/uec-review";
import {CSSProperties, useState} from "react";
import ReactModal from "react-modal";
import ReactMarkdown from "react-markdown";

const Lecture = ({ lect }: { lect: LectureData }) => {
    const [modalOpened, setModalOpened] = useState(false)

    const modalStyle = {
        overlay: {
            position: 'fixed',
            background: 'rgba(0,0,0,.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000
        } as CSSProperties,
        content: {
            position: 'static',
            padding: 30,
            boxSizing: 'border-box',
            width: 'min(95vw, 600px)',
            height: 'min(85vh, fit-content)',
            background: 'var(--window-bkg-color)',
            border: 'none',
            borderRadius: '20px',
            zIndex: 10001
        } as CSSProperties
    }

    return (
        <div className={styles.lecture_wrapper}>
            <div className={styles.fixed_cell}>
                <div>{lect.period}</div>
            </div>
            <div className={styles.lecture_cell} onClick={() => setModalOpened(!modalOpened)}>
                <div className={styles.lecture_name}>{lect.lectureName}</div>
            </div>
            <ReactModal
                isOpen={modalOpened}
                style={modalStyle}
                onRequestClose={() => setModalOpened(!modalOpened)}
            >
                <div className={styles.lecture_detail}>
                    <h2>{lect.lectureName}</h2>
                    <p className={styles.teacher}>
                        {lect.teacher.split(',').map(e => e.trim() + ' さん').join(', ')}
                    </p>
                    <p className={styles.info}>
                        {Math.ceil(lect.semester / 2)} 年{' '}
                        {lect.semester % 2 == 1 ? '前' : '後'}期{' ・ '}
                        {lect.dow.slice(0, 2)}{' '}
                        {Array.from(new Array(lect.length ?? 1))
                            .map((e, i) => `${i + lect.period}`).join(', ')} 限
                    </p>
                    <p className={styles.type}>
                        {lect.type}
                    </p>
                    <p className={styles.review}>
                        <ReactMarkdown>
                            {lect.review ?? ''}
                        </ReactMarkdown>
                    </p>
                </div>
            </ReactModal>
        </div>
    )
}

export default Lecture
